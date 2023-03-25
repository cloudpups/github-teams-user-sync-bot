import fs from "fs"
import { Config } from "./src/config";
import { GetClient } from "./src/services/gitHub";
import { SearchAllAsync } from "./src/services/ldapClient";
import dotenv from "dotenv";
import { SynchronizeGitHubTeam, SynchronizeOrgMembers } from "./src/services/githubSync";

dotenv.config();

async function DoSomething() {        
    const groupName = process.env.SAMPLE_GROUPNAME!;
    const installationId = Number.parseInt(process.env.SAMPLE_INSTALLATION_ID!);
    // const what = await SearchAllAsync(groupName);
    // console.log(what.entries);    
    // fs.writeFileSync("./what.json", JSON.stringify(what.entries));

    const ghClient = GetClient();
    const specificClient = await ghClient.GetOrgClient(installationId);
    const config = await ghClient.GetAppConfig();

    await SynchronizeOrgMembers(specificClient, groupName, config);    
    await SynchronizeGitHubTeam(specificClient, groupName, config);
}

DoSomething();