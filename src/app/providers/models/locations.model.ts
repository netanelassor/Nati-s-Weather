export interface LocationModel {
    Key: number;
    LocalizedName: string;
    Country: Country;
}

export interface Country {
    ID: string;
    LocalizedName: string;
}
