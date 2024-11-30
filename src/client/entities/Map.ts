import { Image } from "../types";

type MapProps = {
    image: Image
}
export class Map {
    public image: Image;

    constructor(props: MapProps) {
        this.image = props.image;
    }

    renderMap() { }
}