/* eslint-disable max-len */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BedType } from "../types/room";

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;

  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number, beds: { type:BedType, count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];

  bathroomCount: number;
  bathroomType: "private" | "public" | null;

  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;

  amenities:string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
  bathroomCount: 1,
  bathroomType: null,
  country: "",
  city: "",
  district: "",
  streetAddress: "",
  detailAddress: "",
  postcode: "",
  latitude: 0,
  longitude: 0,
  amenities: [],
  conveniences: [],
  photos: [],
  description: "",
  title: "",
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    //숙소 선택
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    //건물유형 변경
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    //숙소유형 변경
    setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },
    // 게스트용 숙소 변경
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setMaximumGuestCount(state, action: PayloadAction<number>){
      state.maximumGuestCount = action.payload;
      return state;
    },
    setBedroomCount(state, action: PayloadAction<number>){
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;
      if(bedroomCount < bedList.length){
        //기존 침대개수가 더 많으면 
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        //변경될 침대개수가 더 많으면
        for(let i = bedList.length+1; i < bedroomCount + 1; i += 1){
          bedList.push({ id: i, beds: [] });
        }
      }
      state.bedList = bedList;

      return state;
    },
    setBedCount(state, action: PayloadAction<number>){
      state.bedCount = action.payload;
      return state;
    },
    setBedTypeCount(state, action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if(index === -1){
        // 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }

      if(count === 0){
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else{
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { type, count } = action.payload;
      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if(index === -1){
        // 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
  
      if(count === 0){
        state.publicBedList.splice(index, 1);
      } else{
        state.publicBedList[index].count = count;
      }
      return state;
    },
    setBathroomCount(state, action: PayloadAction<number>){
      state.bathroomCount = action.payload;
    },
    setBatchroomType(state, action: PayloadAction<"private" | "public">){
      state.bathroomType = action.payload;
    },
    setCountry(state, action: PayloadAction<string>){
      state.country = action.payload;
    },
    setCity(state, action: PayloadAction<string>){
      state.city = action.payload;
    },
    setDistrict(state, action: PayloadAction<string>){
      state.district = action.payload;
    },
    setStreetAddress(state, action: PayloadAction<string>){
      state.streetAddress = action.payload;
    },
    setDeatilAddress(state, action: PayloadAction<string>){
      state.detailAddress = action.payload;
    },
    setPostcode(state, action: PayloadAction<string>){
      state.postcode = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>){
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>){
      state.longitude = action.payload;
    },
    setAmenities(state, action: PayloadAction<string[]>){
      state.amenities = action.payload;
    },
    setConveniences(state, action: PayloadAction<string[]>){
      state.conveniences = action.payload;
    },
    setPhotos(state, action:PayloadAction<string[]>){
      state.photos = action.payload;
    },
    setDescription(state, action:PayloadAction<string>){
      state.description = action.payload;
    },
    setTitle(state, action:PayloadAction<string>){
      state.title = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
