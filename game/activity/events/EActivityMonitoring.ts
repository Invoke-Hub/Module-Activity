import type { ArgsOf } from "discordx";
import { Discord, On, Client } from "discordx";
import CRetrieveActivity from "../controllers/CRetrieveActivity.js";

/**
 * A event representing the activity updates
 *
 * @author  Devitrax
 * @version 1.0, 11/09/22
 */
@Discord()
export abstract class EActivityMonitoring {

    private readonly channelId: string = "751454070912581654"

    /**
     * An event that triggers when a user's activity change
     *
     * @param {ArgsOf[]} oldPresence
     * @param {ArgsOf[]} newPresence
     * @param {Client} client
     */
    @On({ event: "presenceUpdate" })
    onUpdate([oldPresence, newPresence]: ArgsOf<"presenceUpdate">, client: Client) {
        if (client.user?.id != process.env.BOT_ID1)
            return;

        if (newPresence == null)
            return;

        if (newPresence.member == null)
            return;

        new CRetrieveActivity({
            member: newPresence.member,
            client: client
        }).execute();
    }

    /**
     * An event that triggers on bot ready retrieving the user's activity
     *
     * @param {ArgsOf} member
     * @param {Client} client
     */
    @On({ event: "ready" })
    onReady([member]: ArgsOf<"ready">, client: Client) {
        if (client.user?.id != process.env.BOT_ID1)
            return;

        client.guilds.fetch(`${this.channelId}`).then(async server => {
            setInterval(function () {
                server.members.cache.each(member => new CRetrieveActivity({
                    member: member,
                    client: client
                }).execute());
            }, 5000);
        });
    }

}