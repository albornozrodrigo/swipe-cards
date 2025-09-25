import './App.css';
import SwipeCards from './components/swipe-cards';

function App() {
  const users = [
    {
      id: '1',
      name: 'Rodrigo',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
      age: 34,
      occupation: 'Desenvolvedor',
      distance: '3km',
      photos: [
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      ],
      interests: ['Arquitetura', 'Desenvolvimento', 'Front-End', 'Back-End'],
    },
    {
      id: '2',
      name: 'Rosana',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      age: 39,
      occupation: 'Arquiteta',
      distance: '3km',
      photos: [
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      ],
      interests: ['Arquitetura', 'Urbanismo', 'Chocolate'],
    }
  ];
  
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <SwipeCards usersList={users} />
    </div>
  )
}

export default App
