import React from 'react'
import ArrowIcon from '../../assets/ArrowIcon';
import { useState } from 'react';
import date from 'date-and-time';

interface Props{
    handleChangeDay: (day: Date) => void;
}

const DaySelector = ({handleChangeDay}: Props ) => {

    const now = new Date();

    const [activeDay, setActiveDay] = useState<Date>(now);

    function unsimplifyDate(date: Date){
        //Tranforma 01/01/2024 em 01 de janeiro de 2024

        const dateArray = date.toISOString().split('T')[0].split('-');
        const day = dateArray[2];
        const month = dateArray[1];
        const year = dateArray[0];

        let monthName = '';
        switch(month){
            case '01':
                monthName = 'janeiro';
                break;
            case '02':
                monthName = 'fevereiro';
                break;
            case '03':
                monthName = 'março';
                break;
            case '04':
                monthName = 'abril';
                break;
            case '05':
                monthName = 'maio';
                break;
            case '06':
                monthName = 'junho';
                break;
            case '07':
                monthName = 'julho';
                break;
            case '08':
                monthName = 'agosto';
                break;
            case '09':
                monthName = 'setembro';
                break;
            case '10':
                monthName = 'outubro';
                break;
            case '11':
                monthName = 'novembro';
                break;
            case '12':
                monthName = 'dezembro';
                break;
        }

        return `${day} de ${monthName} de ${year}`;


    }

    function changeDay(modo: number){
        const newDay = new Date(activeDay);
        newDay.setDate(newDay.getDate() + modo);
        setActiveDay(newDay);
        handleChangeDay(newDay);
    }

  return (
    <div id="daySelector">
        <ArrowIcon direction='left' onClick={() => {
            changeDay(-1);
        }} />
        <h3>{ unsimplifyDate(activeDay) }</h3>
        <ArrowIcon direction='right' onClick={() => {
            changeDay(1);
        }} />
    </div>
  )
}

export default DaySelector