import { Role, GuildMember, Client } from "discord.js";
import { IActivity } from "../interfaces/IActivity";

/**
 * A class representing the game activity retrieve controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
export default class CRetrieveActivity {

    private readonly _gamePrefix: string = "🎮 "

    private readonly _presencePrefix: string = "🎮 [Playing]"

    private readonly _activity: IActivity

    private readonly _roles: Array<Role> = new Array();

    private readonly _aliases: Object = {
        "MIR4": [
            "MIR4",
            "MIR4G",
            "MIR4G[0]",
            "MIR4G[1]",
            "MIR4G[2]",
        ]
    }

    constructor(activity: IActivity) {
        this._activity = activity
    }

    public get member(): GuildMember {
        return this._activity.member
    }

    public get client(): Client {
        return this._activity.client
    }

    /**
     * Retrieves and updates user roles
     */
    execute(): void {
        if (this.member.presence == null)
            return;

        if (this.member.user.bot)
            return;

        Object.entries(this.member.presence.activities).forEach(entry => {
            const [activityKey, activityValue] = entry;

            Object.entries(this._aliases).forEach(entry => {
                const [aliasKey, aliasValue] = entry;
                let activityName = activityValue.name;

                if (aliasValue.includes(activityName.toUpperCase()))
                    activityName = aliasKey;

                let role = this.member.guild.roles.cache.find(role => role.name.toLowerCase() === `${this._presencePrefix} ${activityName}`.toLowerCase());

                if (role != null) {
                    if (!this.member.roles.cache.has(role.id)) {
                        this.member.roles.add(role);
                    }

                    this._roles.push(role);
                }
            });
        });
        this.remove();
    }

    /**
     * Retrieves the activity and sets the role of the user.
     */
    public remove(): void {
        this.member.roles.cache.forEach(role => {
            if (role.name.includes(`${this._gamePrefix}`) && !this._roles.includes(role)) {
                this.member.roles.remove(role);
            }
        });
    }

}