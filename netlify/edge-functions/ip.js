import { Context } from "https://edge.netlify.com";

export default async (request, context) => {
  // Here's what's available on context.geo

  // context: {
  //   geo: {
  //     city?: string;
  //     country?: {
  //       code?: string;
  //       name?: string;
  //     },
  //     subdivision?: {
  //       code?: string;
  //       name?: string;
  //     },
  //   }
  // }

    let response0 = await fetch('https://myip.ipip.net');
    //context.log('POP ip is: ' + await response0.text())
    pop_ip =  await response0.text()

  return context.json({
    my_ip: pop_ip,
    your_ip: context.ip,
    geo: context.geo,
    header: request.headers.get("x-nf-geo"),
  });
};
