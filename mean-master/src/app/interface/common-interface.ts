export interface searchReq{
    // address : string;
    street : string;
    district : string;
    province : string;
    owner_name : string;
    max_size : string;
    min_size : string;
  }

export interface redbookData{
    owner_id : string;
    owner_name : string;
    no_land : string;
    addr : string;
    type : string;
    trans : Array<string>;
    time_remain : string;
    source_provide : string;
    no_licence : string;
    image_cover : string;
    image : Array<string>; 
    use_for : string;
    area : string;
    datetime : string;
    description : string;
}

export interface redbookDetail{
  area1 : string;
  image : Array<string>;
  datetime : string;
  description : string;
}

export interface personData{
  fname : string;
  mname : string;
  lname : string;
  birth : string;
  gender : string;
  card_id : string;
  postal_addr_id : string;
}

export interface personData{
  fname : string;
  mname : string;
  lname : string;
  birth : string;
  gender : string;
  card_id : string;
  postal_addr_id : string;
}

export interface address{
  province : string;
  district : string;
  street : string;
  address : string;
}