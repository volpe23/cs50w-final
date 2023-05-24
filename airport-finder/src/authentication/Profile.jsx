import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import '@/authentication/styles/Profile.scss';
import axios from "@/hooks/useAxios";
import Button from '@/components/utils/Button';

export default function Profile() {

  const { userAccount } = useAuth();
  const { username, first_name, last_name } = userAccount;
  const [lastLogin, setLastLogin] = useState(null);

  const user = new User(userAccount)
  useEffect(() => {
    const controller = new AbortController();
    const getUserData = async () => {
      try {
        const res = await axios.get(`/backend/user/${userAccount.id}`, {
          signal: controller.signal
        })
        const date = new Date(res.data?.response.last_login);
        setLastLogin(date);
        console.log(res, date, );
      } catch(err) {
        console.log(err);
      }
    } 

    getUserData();

    return () => controller.abort();
  }, [userAccount])

  return (
    userAccount &&
    <div className="profile">
      <div className="profile__card">
        <p className="profile__fullname">
          {user.getFullName()}
        </p>
        <span className="profile__username">@{user.username}</span>
      </div>
        <Button style={{
          width: '100%'
        }}>Edit Profile</Button>
      
    </div>
  )
}

class User {
  constructor({username, last_name, first_name, email} = {}) {
    this.username = username,
    this.lastName = capitalizeWord(last_name),
    this.firstName = capitalizeWord(first_name),
    this.email = email
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

}

const capitalizeWord = (word) => {
  const firstLetter = word.charAt(0);
  const restWord = word.slice(1)
  return firstLetter.toUpperCase() + restWord;
}