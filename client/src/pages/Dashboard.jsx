import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import ChatWindow from "../components/dashboard/ChatWindow";
import ContactPreview from "../components/dashboard/ContactPreview";
import { useChat } from "../context/ChatContext";


const CONTACTS = [
  { username: "Rahul", lastMessage: "Peace across the world Peace across the world Peace across the world ", lastUpdated: "10:45 PM", indicator: "✓✓" },
  { username: "Pavan", lastMessage: "Can we sync tomorrow?", lastUpdated: "9:12 PM", indicator: 3 },
  { username: "Jordan Lee", lastMessage: "Sent the deck — thoughts?", lastUpdated: "8:30 PM", indicator: "✓" },
  { username: "Sam Rivera", lastMessage: "Sounds good to me", lastUpdated: "Yesterday", indicator: "✓✓" },
  { username: "Priya Nair", lastMessage: "Reminder: standup at 9", lastUpdated: "6:02 PM", indicator: 1 },
  { username: "Alex Kim", lastMessage: "You: See you then!", lastUpdated: "5:44 PM", indicator: "✓✓" },
  { username: "Elena Voss", lastMessage: "Photo from weekend hike", lastUpdated: "4:18 PM", indicator: 12 },
  { username: "Marcus Webb", lastMessage: "Let me know when you're free", lastUpdated: "3:55 PM", indicator: "✓" },
  { username: "Noah Patel", lastMessage: "Thanks for the intro 🙌", lastUpdated: "2:20 PM", indicator: "✓✓" },
  { username: "Riley Fox", lastMessage: "Draft is in the shared folder", lastUpdated: "1:08 PM", indicator: 7 },
  { username: "Casey Morgan", lastMessage: "Coffee next week?", lastUpdated: "12:41 PM", indicator: "✓✓" },
  { username: "Drew Hayes", lastMessage: "Running 5 min late", lastUpdated: "11:22 AM", indicator: "✓" },
  { username: "Zoe Martin", lastMessage: "Happy birthday!", lastUpdated: "10:05 AM", indicator: "✓✓" },
  { username: "Chris Ortiz", lastMessage: "Link expired — resend?", lastUpdated: "Yesterday", indicator: 2 },
  { username: "Taylor Brooks", lastMessage: "Approved on my end", lastUpdated: "Mon", indicator: "✓✓" },
  { username: "Jamie Quinn", lastMessage: "Ping me when you're online", lastUpdated: "Sun", indicator: 5 },
  { username: "Morgan Blake", lastMessage: "See thread above", lastUpdated: "Sat", indicator: "✓" },
  { username: "Reese Park", lastMessage: "Voice note (0:42)", lastUpdated: "Fri", indicator: "✓✓" },
  { username: "Quinn Avery", lastMessage: "Merged — all green", lastUpdated: "Thu", indicator: "✓✓" },
  { username: "Blake Foster", lastMessage: "Catch you after the holiday", lastUpdated: "Wed", indicator: "✓" },
];

function Dashboard() {
  const { user } = useAuth();
  const { contact, handleContactClick } = useChat();

  return (
    <>
      <div className="d-flex">
        <Sidebar
          username={user.username}
          contacts={CONTACTS}
          onContactSelect={handleContactClick}
        />
        <ChatWindow username={contact} />
        <ContactPreview username="Pavan Kumar"/>
      </div>
    </>
  );
}

export default Dashboard;
