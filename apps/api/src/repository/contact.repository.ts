import { other } from '@lib/routes/rest/rest-error';
import { client } from '@superlight-labs/database';
import { Contact, CreateTransactionRequest, Transaction } from './contact';

export const createContact = async (request: Contact): Promise<Contact> => {
  const contact = await client.contact.create({
    data: { ...request },
  });

  if (!contact) throw other('Error while creating Contact');

  return contact;
};

export const createTransaction = async (
  request: CreateTransactionRequest
): Promise<Transaction> => {
  const transaction = await client.transaction.create({
    data: {
      ...request,
      reciever: {
        connectOrCreate: {
          create: { ...request.reciever },
          where: {
            address: request.reciever.address,
          },
        },
      },
    },
    include: {
      reciever: true,
    },
  });

  if (!transaction) throw other('Error while creating transaction');

  return transaction;
};

export const readContacts = async (userAddress: string, peerAddress?: string) => {
  const contacts = await client.contact.findMany({
    where: {
      OR: [
        {
          recievedTransactions: {
            some: {
              OR: [{ senderAddress: userAddress }, { recieverAddress: { contains: peerAddress } }],
            },
          },
        },
        {
          sentTransactions: {
            some: {
              OR: [{ recieverAddress: userAddress }, { senderAddress: { contains: peerAddress } }],
            },
          },
        },
      ],
    },
  });

  if (!contacts) throw other('Error while reading Contacts');

  return contacts;
};

export const readAllContacts = async (): Promise<Contact[]> => {
  const contacts = await client.contact.findMany();

  return contacts;
};
