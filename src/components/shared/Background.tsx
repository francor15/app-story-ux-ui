'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Background() {
    return (
        <>
            <motion.div
                className={`absolute top-0 left-0 h-full w-full bg-[url('/blur.svg')] bg-cover bg-center bg-fixed`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.6 }}
            />
            <motion.div
                className={`absolute top-0 left-0 h-[25rem] md:h-[30rem] lg:h-[15rem] w-full mx-auto bg-[url('/vector.svg')] bg-cover bg-center`}
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7 }}
            />
        </>
    )
}
