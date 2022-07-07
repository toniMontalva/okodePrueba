export class Film {
  constructor(
    public id: string,
    public title: string,
    public releaseDate: Date,
    public language: string,
    public overview: string,
    public poster?: string
  ) {}
}
