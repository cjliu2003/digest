import React from 'react'
import './footer.css'
import Maxton from '../../assets/maxton.JPG'
import Luc from '../../assets/luc.JPG'
import Thomas from '../../assets/thomas.JPG'
import Caleb from '../../assets/caleb.JPG'
const Footer = () => {
  const people = [
    {name: "Maxton Huff", img: Maxton, major: "Stanford CS '25" },
    {name: "Luc Alvarez", img: Luc, major: "Stanford Design '25" },
    {name: "Thomas Yim", img: Thomas, major: "Stanford CS '25" },
    {name: "Caleb Liu", img: Caleb, major: "Stanford CS '25" },
  ]
  return (
    <div className="digest__footer__bg">
      <div className="digest__footer flex__col ac section__padding">
          <div className="gradient__text digest__footer__col flex__col ac">
              <h2>Created during TreeHacks by</h2>
          </div>
          <div className="digest__footer__team-row flex__row ac">
            {people.map((person) => {
              return(
                <div className="digest__footer__person flex__col ac">
                  <img src={person.img}/>
                  <p className="digest__footer__person-text">{person.name}</p>
                  <p className="digest__footer__major">{person.major}</p>
                </div>
              )
            })}
          </div>
      </div>
      <div className="digest__copyright">
          <p>digest.AI | Created February 17-19, 2023</p>
      </div>
    </div>
  )
}

export default Footer