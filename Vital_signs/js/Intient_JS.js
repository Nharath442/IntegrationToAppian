<script>
        let p;
        
        document.addEventListener('DOMContentLoaded', 
            function(){
                p = document.querySelector('main>p');
                p.addEventListener('click', doFetch);
            });
        
        function doFetch(ev){
            let uri = "https://localhost/apache/no-browse/sample.json";
            
            let h = new Headers();
            h.append('Accept', 'application/json');
            let encoded = window.btoa('rex:pass123');
            let auth = 'Basic ' + encoded;
            h.append('Authorization', auth );
            console.log( auth );
            
            let req = new Request(uri, {
                method: 'GET',
                headers: h,
                credentials: 'include'
            });
            //credentials: 'same-origin'
            
            fetch(req)
            .then( (response)=>{
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('BAD HTTP stuff');
                }
            })
            .then( (jsonData) =>{
                console.log(jsonData);
                p.textContent = JSON.stringify(jsonData, null, 4);
            })
            .catch( (err) =>{
                console.log('ERROR:', err.message);
            });
        }
        
        /********************************
        Server can send headers
        WWW-Authenticate: Basic realm="Realm Description" charset="UTF-8"
        HTTP/1.1: 401 Unauthorized
        HTTP/1.1: 403 Forbidden
        
        Client sends header
        Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
        The string is username:password base-64 encoded
        MUST BE OVER HTTPS
        ********************************/
    </script>