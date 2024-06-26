import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './Main.module.css'
import { useState, useEffect } from "react";
import { GetAPI } from '../api/RestAPIs';

function Main(){

    const navigate = useNavigate();

    const { prodCode } = useParams();

    const [lastProds, setLastProds] = useState([]);

    const fetchProds = async () => {
        const prodsAddress = `/lastProds`
        const prodsResponse =  await GetAPI(prodsAddress);
        setLastProds(prodsResponse.lastProds);
    };

    useEffect(() => {
        fetchProds(prodCode);
    },[prodCode]);

    const handleProductClick = (prodCode) => {
        navigate(`/productdetail/${prodCode}`);
    };

    return(
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <p className={styles.title1}>Help your dogs<br/>
                    Health</p>
                    <Link to={'/curation'} className={styles.button1} >맞춤 사료 찾기</Link>
                    <img className={styles.img1} src='./images/main/maindog1.png'/>
                </div>
                <div>    
                </div>
            </div>
            <div className={styles.container1}>
                <hr className={styles.line1}/>
                <p className={styles.title2}>Our Services</p>
                <div className={styles.iconContainer}>
                    <NavLink to={'/dict'}>
                        <img className={styles.icon1} src='./images/main/Icon1.png' alt='견종백과'/>
                    </NavLink>
                    <NavLink to={'/curation'}>
                        <img className={styles.icon1} src='./images/main/Icon2.png' alt='맞춤 사료 찾기'/>
                    </NavLink>
                    <NavLink to={'/board'}>
                        <img className={styles.icon1} src='./images/main/Icon3.png' alt='게시판'/>
                    </NavLink>
                </div>
                <div className={styles.iconContainer1}>
                    <Link to={'/dict'} className={styles.text1}>견종백과</Link>
                    <Link to={'/curation'} className={styles.text5}>맞춤사료찾기</Link>
                    <Link to={'/board'} className={styles.text6}>게시판</Link>
                </div>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line2}/>
                <span className={styles.title3}>User's</span>
                <span className={styles.title4}> Best</span>
                <div className={styles.wrapContainer}>
                {lastProds.map(prod => (
                    <div className={styles.prodContainer} key={prod.prodCode} onClick={()=> handleProductClick(prod.prodCode)}>
                        <img className={styles.prods} src={prod.prodImage}/>
                        <div className={styles.prodText}>
                            <p className={styles.text7}>{prod.prodManufac}</p>
                            <p className={styles.text8}>{prod.prodName}</p>
                        </div>
                    </div>
                ))}
                </div>
                </div>
                <Link to={'/products'} className={styles.button2}>사료 검색하기</Link>
            <div className={styles.container2}>
                <hr className={styles.line3}></hr>
                <div className={styles.dogsContainer}>
                    <p className={styles.title5}>About Dogs</p>
                    <img className={styles.img2} src='./images/main/maindog2.png'/>
                    <div className={styles.dogsdoc}>
                        <p className={styles.text3}>
                        강아지마다 특징과 필요로 하는 것이 다릅니다.<br/>
                        동일한 품종이라고 해도 반려동물마다 다르기 때문에 여기에서<br/>
                        소개하는 품종 세부 사항은 하나의 지표로 받아들여야 합니다. <br/>
                        행복하고 건강하며 행동이 올바른 반려동물을 기르고 싶다면 훈련과 <br/>
                        사회화는 물론이고 기본적인 행복과 관련된 요구를 비롯해 <br/>
                        사회적, 행동적 요구까지 해결해주는 것이 좋습니다.<br/>
                        </p>
                    <Link to={'/dict'} className={styles.button3}>더 알아가기</Link>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line4}></hr>
                <NavLink to={'/board'}>
                    <img className={styles.img3} src='./images/main/boards1.png' />
                </NavLink>
            </div>
            <div className={styles.container2}>
                <hr className={styles.line5}></hr>
                <div className={styles.companyinfo}>
                    <img className={styles.logo1} src='./images/etc/logo1.png'/>
                    <div className={styles.companyinfodoc}>
                        <p className={styles.title6}>About DogSeek</p>
                        <p className={styles.text4}>반려견의 취향 혹은 필요한 요소 등을 통해 <br/>
                        적합한 사료를 추천해주는 큐레이션 서비스를 제공하는 사이트 입니다.</p>
                        <Link to={'/company'} className={styles.button4}>회사 소개</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;