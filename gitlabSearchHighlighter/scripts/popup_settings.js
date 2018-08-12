var options = {
    'alwaysInjectURLs'  : ['https://gitlab.com/search']
};

chrome.storage.local.get( options, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    chrome.tabs.query({
        "active"        : true,
        "currentWindow" : true
    }, function ( tabs ) {
        tab_id = tabs[ 0 ].id;

        for( url in options[ 'alwaysInjectURLs'] ) {
            if( tabs[ 0 ].url.indexOf( options[ 'alwaysInjectURLs'][ url ] ) != -1 ) {
                document.getElementById( 'alwaysInject' ).style.display = 'none';
            }
        }

        document.getElementById( 'inject' ).onclick = function() {
            chrome.tabs.sendMessage( tab_id, { "function" : "inject" } );
            document.getElementById( 'inject' ).textContent = "DONE ✓";
            setTimeout( function( ) {
                document.getElementById( 'inject' ).textContent = "HIGHLIGHT";
            }, 1000 );
        }
    });
});
