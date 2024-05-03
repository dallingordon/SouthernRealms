/** SSO'd user for Auth  */
export default class User {
  public userName: string;
  public imgUrl: string;

  constructor({ userName, imgUrl }: { userName: string; imgUrl: string }) {
    this.userName = userName;
    this.imgUrl = imgUrl;
  }
}
