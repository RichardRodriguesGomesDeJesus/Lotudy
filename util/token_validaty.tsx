import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { parseCookies } from 'nookies';
import { useEffect, useState } from "react";

export default async function ValidatyToken() {
  const { 'token': token } = parseCookies();
  useEffect(()=>{
    if (!token) {
      axios.post('/api/auth/verify_token', {
        token: 'invalid',
      })
    } else {
      try {
         axios.post('/api/auth/verify_token', {
          token,
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
}
