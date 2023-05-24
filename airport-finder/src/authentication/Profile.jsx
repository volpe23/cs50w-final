import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import '@/authentication/styles/Profile.scss';
import axios from "@/hooks/useAxios";
import Button from '@/components/utils/Button';

export default function Profile() {

  const { userAccount } = useAuth();
  const { username, first_name, last_name } = userAccount;
  const [userData, setUserData] = useState(null);
  // const user = new User(userAccount)
  useEffect(() => {
    const controller = new AbortController();
    const getUserData = async () => {
      try {
        const res = await axios.get(`/backend/user/${userAccount.id}`, {
          signal: controller.signal
        })
        // const user1 = new User()
        console.log(res);
        const date = new Date(res?.data?.date_joined);
        setUserData(new User({...userAccount, dateJoined : date}))
      } catch(err) {
        console.log(err);
      }
    } 

    getUserData();

    return () => controller.abort();
  }, [userAccount])

  return (
    userData &&
    <div className="profile">
      <div className="profile__card">
        <p className="profile__fullname">
          {userData.getFullName()}
        </p>
        <span className="profile__username">@{userData.username}</span>
        <p>
          Joined {userData.showDate()}
        </p>
      </div>
        <Button style={{
          width: '100%'
        }}>Edit Profile</Button>
      
    </div>
  )
}

class User {
  constructor({username, last_name, first_name, email, dateJoined} = {}) {
    this.username = username,
    this.lastName = capitalizeWord(last_name),
    this.firstName = capitalizeWord(first_name),
    this.email = email,
    this.dateJoined = dateJoined
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  showDate() {
    return this.dateJoined.toDateString();
  }

}

const capitalizeWord = (word) => {
  const firstLetter = word.charAt(0);
  const restWord = word.slice(1)
  return firstLetter.toUpperCase() + restWord;
}