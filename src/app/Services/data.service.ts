import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
    }

    private myData: { type: string, duree: string, prix: number } = {
        type: '',
        duree: '',
        prix: 0
    };

    setData(data: any) {
        this.myData = data;
    }

    getData() {
        return this.myData;
    }
}
