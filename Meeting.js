class Meeting {

    constructor (meeting_id, password, domain='zoom.us', start='00:00', end='00:00') {
        
        this._id = meeting_id.replace(/\s/g, '');
        this._pwd = password;
        this._domain = domain;
        
        this._padding = 5;
        this._start = start;
        this._end = end;

        this._browser = 'chrome';
        this._mobile = false;
        this._control = 0;

        this.name = 'Zoom meeting';
        this.description = 'A basic zoom meeting.';

    }

    has_started (time=new Date()) {

        let hours = time.getHours(),
            mins = time.getMinutes(),
            day = time.getDay(),
            start = this._start.split(':').map(e => Number(e)),
            end = this._end.split(':').map(e => Number(e));

        start[1] = Math.max(start[1] - this._padding, 0)

        if (day >= 1 && day <= 5) {
            if (start[0] > end[0] || ((start[0] == end[0]) && (start[1] > end[1]))) {
                return false;
            } else {
                if (hours > start[0] && hours < end[0]) {
                    return true;
                } else if (hours == start[0] && mins >= start[1]) {
                    return true;  
                } else if (hours == end[0] && mins <= end[1]) {
                    return true;
                }
            }
        }

        return false;
    } 

    launch () {
        window.location.href = this.url;
    }

    get url () {
        return `${this._mobile ? 'zoomus' : 'zoommtg'}://${this._domain}/join?action=join&pwd=${this._pwd}&confno=${this._id}&zc=0&browser=${this._browser}&t=${Date.now()}`;
    }

    set id (meeting_id) { this._id = meeting_id; }
    get id () { return this._id; }

    set password (text) { this._pwd = text; }
    get password () { return this._pwd; }

    set domain (link) { this._domain = link; }
    get domain () { return this._domain; }

    set mobile (bool) { this._mobile = bool; }
    get mobile () { return this._mobile; }

    print () {
        console.group(this.name);

        console.log(this.description);
        console.log(this.has_started() ? 'Meeting has started.' : 'Meeting starts at ' + this._start + ' and ends at ' + this._end);

        console.groupEnd();
    }
}
