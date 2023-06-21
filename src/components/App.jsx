import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './Container.styled';
import { ContactFormSection } from './ContactForm/ContactFormSection.styled';
import { ContactListSection } from './ContactList/ContactListSection.styled';

const KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem(KEY));

    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem(KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const formSubmitHandler = ({ name, number }) => {
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

  const removeContact = e => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== e.target.dataset.id
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
