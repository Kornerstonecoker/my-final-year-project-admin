/**
 * The `SetupPage` component uses the `useStoreModal` hook to open a modal when the component mounts.
 * @returns The SetupPage component is returning null.
 */
"use client"

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";


const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen){
      onOpen()
    }
  }, [isOpen, onOpen])
  return null
}

export default SetupPage;