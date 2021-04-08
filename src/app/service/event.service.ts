import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class EventService {
    protected _eventsSubject = new Subject<any>();

    constructor() {
    }

    public broadcastEvent(value: any) {
        this._eventsSubject.next(value);
    }

    public getEvent(): Observable<any> {
        return this._eventsSubject.asObservable().pipe(map(e => e));
    }

}
