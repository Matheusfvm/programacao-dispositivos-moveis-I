export interface Contato {
  id: string;
  name: string;
  phoneNumbers?: { number: string }[];
}