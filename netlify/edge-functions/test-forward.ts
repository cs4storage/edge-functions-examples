
import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {

  /*
  const joke = await fetch("https://icanhazdadjoke.com/", {
    "headers": {
      "Accept": "application/json"
    }
  });
  const jsonData = await joke.json();
  return context.json(jsonData);
  */

  return forwardReq(request,context)
};




async function forwardReq(request, context) {

    console = context;

    if (request.headers.get(TOKEN_HEADER) != TOKEN_VALUE) {
      return new Response("Welcome to nginx!")
    }
  
    let newHdrs = new Headers()
    for (const [key, value] of request.headers) {
      if (key.toLowerCase() == TOKEN_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase() == HOST_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase() == IP_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase().startsWith('cf-')) {
          continue;
      }
      if (key.toLowerCase() == 'x-forwarded-for') {
          continue;
      }
      if (key.toLowerCase() == 'x-real-ip') {
          continue;
      }
      console.log( key + ": " +  value )
      newHdrs.set(key, value)
      //newHdrs.append(key, value)
    }
    newHdrs.set('Host', request.headers.get(HOST_HEADER))
    //newHdrs.set('X-Forwarded-For', request.headers.get(IP_HEADER))
    //console.log("newHdrs: " + JSON.stringify(newHdrs))
    //console.log("newHdrs: " + newHdrs.toString())
    //console.log("org headers: " + request.headers.toString())
    for (const [key, value] of newHdrs){
      console.log("new headers  " + key + ": " + value)
    }
  
    let address = ''
    const url = new URL(request.url)
    //address = request.url.replace(url.hostname, request.headers.get(HOST_HEADER))
    console.log(url)
    //console.log(request.headers.get(HOST_HEADER))
  
    address = request.url.replace(url.hostname, request.headers.get(HOST_HEADER))
    //address3 = request.url.replace(url.hostname, 'ipinfo.io')
    console.log("address:" + address)
  

    const init = {
      body: request.body,
      headers: newHdrs,
      method: request.method
    }
  

  
    console.log(JSON.stringify(init))
      
    //Cache-Control: private, no-store
  
    // only ipinfo.io 
  
    //let response = await fetch (address, init);
    let response = await fetch (address, init);
    //let response3 = await fetch ('https://www.baidu.com', init3);

  
    let resp_tt = await fetch("https://ipinfo.io/json");
    //console.log("==== IPINFO: " + resp_tt.body)
    const text = await resp_tt.text();
    console.log("==== IPINFO: " + text)
    //console.log("==== IPINFO: " + resp_tt.body.json())
  
  
    return response

  }
  