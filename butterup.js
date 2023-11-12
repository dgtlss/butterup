var butterup = {
    options:{
        maxToasts: 5, // Max number of toasts that can be on the screen at once
        toastLife: 5000, // How long a toast will stay on the screen before fading away
        currentToasts: 0, // Current number of toasts on the screen
    },
    toast:function(title, message, type, location, icon, customIcon){
        // we need to spawn the toaster inside the body depending on the location specified. If no location is specified then we spawn in the top-right by default
        // the div has an ol inside of it with a class of rack. each li inside of this has a class of butteruptoast
        
        /* Check if the toaster exists. If it doesn't, create it. If it does, check if there are too many toasts on the screen.
        If there are too many, delete the oldest one and create a new one. If there aren't too many, create a new one. */
        if(document.getElementById('toaster') == null){
            // toaster doesn't exist, create it
            const toaster = document.createElement('div');
            toaster.id = 'toaster';
            if(location == null){
                toaster.className = 'toaster top-right';
            }else{
                toaster.className = 'toaster ' + location;
            }
            document.body.appendChild(toaster);

            // Create the toasting rack inside of the toaster
            if(document.getElementById('butterupRack') == null){
                const rack = document.createElement('ol');
                rack.id = 'butterupRack';
                rack.className = 'rack';
                toaster.appendChild(rack);
            }
        }else{
            const toaster = document.getElementById('toaster');
            const rack = document.getElementById('butterupRack');
        }

        // Check if there are too many toasts on the screen
        if(butterup.options.currentToasts >= butterup.options.maxToasts){
            // there are too many toasts on the screen, delete the oldest one
            var oldestToast = rack.firstChild;
            rack.removeChild(oldestToast);
            butterup.options.currentToasts--;
        }

        // Create the toast
        const toast = document.createElement('li');
        toast.className = 'butteruptoast';
        toast.id = 'butterupToast-' + butterup.options.currentToasts;
        if(type != null){
            toast.className += ' ' + type;
        }
        
        // Add the toast to the rack
        document.getElementById('butterupRack').appendChild(toast);
        
    }
}


/* Options for a user to spawn a toast are as follows:
    - location: top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
    - type: success, error, warning, info, (if no type is specified, it will default to standard)
    - icon: boolean (true or false)
    - customIcon: string (path to custom icon) ** If icon is set to false, this will be ignored **
*/