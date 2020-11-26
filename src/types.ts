export interface EncoderResponse {
  status: number;
  orignalSize: number;
  textSize: number;
  eff: number;
}

export interface DecoderResponse {
  status: number;
  text: string;
}
