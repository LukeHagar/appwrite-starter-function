import { Client , Databases, ID } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }: any) => {
  // log(req.bodyRaw); // Raw request body, contains request data
  // log(JSON.stringify(req.body)); // Object from parsed JSON request body, otherwise string
  // log(JSON.stringify(req.headers)); // String key-value pairs of all request headers, keys are lowercase
  // log(req.scheme); // Value of the x-forwarded-proto header, usually http or https
  // log(req.method); // Request method, such as GET, POST, PUT, DELETE, PATCH, etc.
  // log(req.url); // Full URL, for example: http://awesome.appwrite.io:8000/v1/hooks?limit=12&offset=50
  // log(req.host); // Hostname from the host header, such as awesome.appwrite.io
  // log(req.port); // Port from the host header, for example 8000
  // log(req.path); // Path part of URL, for example /v1/hooks
  // log(req.queryString); // Raw query params string. For example "limit=12&offset=50"
  // log(JSON.stringify(req.query));

  const client = new Client()
     .setEndpoint('http://appwrite-functions/v1')
     .setProject(Bun.env["APPWRITE_FUNCTION_PROJECT_ID"])
     .setKey(Bun.env["APPWRITE_API_KEY"])
     .setSelfSigned(true);

  const databases = new Databases(client);

  log(`Initialized Database Client`);

  // The `req` object contains the request data
  if (req.method === "GET") {
    try{
      await databases.createDocument("load", "bun", ID.unique(), {
        count: 1,
      });
      log(`Created Record`);
      return res.send(`Created Record`);
    }
    catch(e){
      error(`Error: ${JSON.stringify(e)}`);
    }
  } else {
    return res.send(`Invalid request method. Please use GET.`);
  }
};
