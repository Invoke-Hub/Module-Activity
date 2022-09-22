/**
 * A interface representing game activity properties
 *
 * @author  Devitrax
 * @version 1.0, 11/09/22
 */
import { Client, GuildMember } from "discord.js";

export interface IActivity {
    member: GuildMember
    client: Client
}