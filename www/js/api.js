const DEVICE_TOKEN = 'MyTestDeviceToken-1';
const API_URL = 'http://07c1729f.ngrok.io/';
const ARN_ENDPOINT = 'arn-endpoint';

function setStorage(key, value) {
    window.localStorage.setItem(key, value);
}
function getStorageKey(key) {
    return window.localStorage.getItem(key);
}

function createEndpoint(token) {
    fetch(`${API_URL}endpoints`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
        }),
    })
    .then(async response => {
        const res = await response.json();
        $("#console").text(print_r(res));
        setStorage(ARN_ENDPOINT, res.arn);

        jQuery("#createDeviceEndpoint").hide();
        jQuery("#unsubscribe").show();
    })
    .catch(error => alert(error.message));
}

function unsubscribe() {
    fetch(`${API_URL}subscriptions/${encodeURIComponent(getStorageKey(ARN_ENDPOINT))}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            enabled: false,
        }),
    })
    .then(async response => {
        const res = await response.json();
        $("#console").text(print_r(res));
        
        jQuery("#subscribe").show();
        jQuery("#unsubscribe").hide();
    })
    .catch(error => alert(error.message));
}

function subscribe() {
    fetch(`${API_URL}subscriptions/${encodeURIComponent(getStorageKey(ARN_ENDPOINT))}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            enabled: true,
        }),
    })
    .then(async response => {
        const res = await response.json();
        $("#console").text(print_r(res));
        
        jQuery("#unsubscribe").show();
        jQuery("#subscribe").hide();
    })
    .catch(error => alert(error.message));
}

function print_r(o) {
  return JSON.stringify(o,null,'\t').replace(/\n/g,"\r\n").replace(/\t/g,'   '); 
}