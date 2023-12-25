import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Container } from './Container.styled';
import { ContactFormSection } from '../ContactForm/ContactFormSection.styled';
import { ContactListSection } from '../ContactList/ContactListSection.styled';
import { IFormData } from 'interfaces/IFormData';
import { IContact } from 'interfaces/IContact';

const KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(KEY);

    if (typeof savedContacts === 'string') {
      const contacts = JSON.parse(savedContacts);

      if (contacts) {
        setContacts(contacts);
      }
    }
  }, []);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem(KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const formSubmitHandler = ({ name, number }: IFormData) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(state => [contact, ...state]);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = (e: MouseEvent<HTMLButtonElement>) => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== (e.target as HTMLButtonElement).dataset.id
    );
    setContacts(updatedContacts);
  };

  return (
    <Container>
      <ContactFormSection>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />
      </ContactFormSection>

      <ContactListSection>
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList
          filteredContacts={getFilteredContacts()}
          onRemoveContact={removeContact}
        />
      </ContactListSection>
    </Container>
  );
}
