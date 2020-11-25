export interface EncoderResponse {
  status: number;
  orignalSize: number;
  text: Array<number>;
  textSize: number;
  dict: Array<Array<string>>;
  eff: number;
}

export interface DecoderResponse {
  status: number;
  text: string;
}
