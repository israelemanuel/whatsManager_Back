


// name: msgContact?.name || msgContact.id.replace(/\D/g, ""),
// phone: msgContact.id.replace(/\D/g, ""),
// profilePicUrl,
// isGroup: msgContact.id.includes("g.us"),
// subscribeId,

import Contact from "../../models/Contact";

interface IContact {
    _id?: string;
    name: string;
    phone: string;
    email?: string;
    profilePicUrl: string;
    isGroup: boolean;
    subscribeId: string;
}

export default class UpdateOrSaveContactWhatsapp {
    async executar({ name, phone, email, profilePicUrl, isGroup, subscribeId }: IContact) {

        const contact = await Contact.findOne({
            phone: phone,
            subscribeId: subscribeId
        })

        if (contact) {
            let contact = await Contact.findOneAndUpdate({
                phone,
                subscribeId
            }, {
                $set: {
                    profilePicUrl
                }
            }, { new: true });

            return contact?.toJSON();

        } else {
            const contact = new Contact({
                name,
                phone,
                email,
                profilePicUrl,
                isGroup,
                subscribeId
            })
            await contact.save();

            return contact.toJSON();

        }
    }
}