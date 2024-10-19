import React, { useState } from 'react'
import styled from 'styled-components'
import image from '../../img/image.png'
import { menuItems } from '../../utils/menuItems'
import { signout } from '../../utils/icons';


function Navigation({active, setActive}) {

  
  return (
   
    <NavStyled>
        <div className='user-con'>
            <img src={image} alt='' />
            <div>
                <h2>Lithira</h2>
                <p>Financial Menu</p>
            </div>
        </div>
        <ul className='menu-items'>
            {menuItems.map((item) => {
                return <li
                 key ={item.id}

                 onClick={() => setActive(item.id)}
                 className={active === item.id? 'active': ''}
                 >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className='bottom-nav'>
            <li>
                {signout} Sign Out
            </li>
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(0, 0, 0, 0.78);
    border: 3px solid #8a2be2;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
     .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #000000;
            border: 2px solid #8a2be2;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(138,43,226,1.00);
        }
        p{
            color: rgba(138,43,226,0.8);
        }
    }
    
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(138,43,226,1);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(138,43,226,1);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    .active{
        color: rgba(138,43,226,1) !important;
        i{
            color: rgba(138,43,226,1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #8a2be2;
            border-radius: 0 10px 10px 0;
        }
    }

            

`;

export default Navigation