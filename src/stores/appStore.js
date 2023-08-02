import { getDatabase, ref, onValue, set } from 'firebase/database';
import { defineStore } from 'pinia';
import { getAuth, signOut } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import getAverageColor from 'get-average-color';
import imglyRemoveBackground from "@imgly/background-removal"
import router from '@/router';
export const useAppStore = defineStore('app', {
    state: () => ({ 
        colorScheme: [], 
        colorSchemeNew: [],
        nickName: '',
        nickNameNew: '',
        profilePhotoBlob: null,
        profilePhoto: null,
        VIN: '',
        isProfileEmpty: false,
        saveDisabled: true,
        uploadProgressMessage: '',
        inputDisabled: false,
     }),
    getters: {
      getColorScheme: (state) => state.colorScheme,
      getNickName: (state) => state.nickName,
      getProfilePhoto: (state) => state.profilePhoto,
      getVin:(state) => state.VIN,
    },
    actions: {
       async loadProfileData() {
        const db = getDatabase();
        const auth = getAuth();
        const profLoc = `users/${auth.currentUser.uid}/cars`;
        // Create reference to get the cars associated to a users profile
        const carProfileRef = ref(db, profLoc);

        // Logic to handle getting user's data. Will dynamiaclly update as it's being changed
        await onValue(carProfileRef, async (snapshot) => {
            let data = {};
            data = snapshot.val();
            if (data === {}){
                this.isProfileEmpty = true;
            } else {
              // For now, only dealing with 1 car per profile. Will have to update this to allow for multiple cars
            this.VIN = data?.car1?.VIN ?? '';
            this.nickName = data?.car1?.NickName ?? '';
            this.colorScheme = data?.car1?.ColorScheme ?? [];
            }
            await this.loadProfilePhoto();
            this.nickNameNew = this.nickName;
        });

     
      },
     async loadProfilePhoto(){
           // Logic to get the profile photo
           const auth = getAuth();
           const storage = getStorage();
           // Set the path. THIS WILL NEED TO BE UPDATED IF MULTIPLE CARS ARE TO BE SUPPORTED
           const profLoc = `users/${auth.currentUser.uid}/cars`;
           const picRef = storageRef(storage, profLoc + '/car1/profilePic');
           // Get the download URL
          this.profilePhoto = await getDownloadURL(picRef)
      },
      changeImage(newImg) {
        this.saveDisabled = true;
        this.inputDisabled = true;
        this.uploadProgressMessage = 'Proccessing Image... Please Wait'
        imglyRemoveBackground(newImg).then((blob) => {
            this.profilePhotoBlob = blob;
            const imgProccessed = URL.createObjectURL(blob);
            getAverageColor(imgProccessed)
            .then(color => { 
              if (color?.r && color?.g && color?.b) {
                this.colorSchemeNew = color;
                this.uploadProgressMessage = 'Image Successfully Proccessed';
                this.saveDisabled = false;
              }
              else {
                this.uploadProgressMessage = 'Image is invalid. Please try another image.';
              }
            })
            .catch(err => { 
              this.uploadProgressMessagec= `The following error has occurred ${err}. Try again later`;
             });
             this.inputDisabled = false;
        });
      },
      async saveProfile() {
        this.uploadProgressMessage = ''
        this.saveDisabled = true;
        const updatedConfig = {
          VIN: this.VIN,
          ColorScheme: this.colorSchemeNew,
          NickName: this.nickNameNew
        }
        
        //write the updated user data
        const db = getDatabase();
        const auth = getAuth();
        const writeLoc = `users/${auth.currentUser.uid}/cars/car1`;
        // Create reference to get the cars associated to a users profile
        // For now, only 1 car per profile. Will have to update this logic to be able to add and remove multiple cars from a profile if this goes to Prod
        const carProfileRef = ref(db, writeLoc);
        set(carProfileRef, updatedConfig);

        // Upload the saved photo to the cloud
        if (this.profilePhotoBlob) {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg'
        };
        const saveImgPath = storageRef(storage, writeLoc + '/profilePic');
        await uploadBytes(saveImgPath, this.profilePhotoBlob, metadata)
           //Reset and update profile photo
        this.profilePhotoBlob = null;
        await this.loadProfilePhoto();
        this.nickName = this.nickNameNew;
        this.colorScheme = this.colorSchemeNew;
        }
      },
      signOut() {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
          router.push('/login')
        })
      },
      enableSave() {
        this.saveDisabled = false;
      }
    },
  })