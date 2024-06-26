import { GetAPI } from "../../api/RestAPIs";
import React, {useState, useEffect, useRef} from 'react';
import styles from "./Products.module.css"
import { useNavigate } from 'react-router-dom';

function Products () {
    
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [most, setMost] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [maxPrice, setMaxPrice] = useState();
    const [filterPrice , setFilterPrice] = useState(maxPrice);
    const [filterRecom, setFilterRecom] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [filterCook, setFilterCook] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [filterEffi, setFilterEffi] = useState('');
    const [value, setValue] = useState('');

    const productsList = async () => {

        const productsListAddress = "/products"
        const productsListResponse = await GetAPI(productsListAddress);
        setProduct(productsListResponse.products);

        const prices = productsListResponse.products.map(p => p.prodPrice);
        const maxProdPrice = Math.max(...prices);
        setMaxPrice(maxProdPrice);
    };

    const mostProducts = async () => {

        const mostProductsAddress = "/products/mostProducts"
        const mostProductsResponse = await GetAPI(mostProductsAddress);
        setMost(mostProductsResponse.products);
    };

    useEffect(() => {
        productsList();
        mostProducts();
    }, []);

    useEffect(() => {
        setFilterPrice(maxPrice)
    }, [maxPrice]);

    const searchProducts = async () => {
        const searchProductsAddress = `/products/search?value=${value}&prodRecom=${filterRecom}&prodAge=${filterAge}&prodCook=${filterCook}&prodSize=${filterSize}&prodEffi=${filterEffi}&prodPrice=${filterPrice}`
        const searchProductsResponse = await GetAPI(searchProductsAddress);
        setProduct(searchProductsResponse.products);
    }

    const handleSearchClick = () => {
            searchProducts();
    };

    const onSubmitSearch = (e) => {
        if (e.key === "Enter") {
            searchProducts();
        }
    };

    const onClick = (prodCode, age, size, cook, prodIngra, prodEffi) => {
        const ingra = prodIngra.split(",")[0];
        const disease = prodEffi.split(",")[0];
        navigate ("/productdetail", {
            state: {
                prodCode: prodCode,
                age: age,
                size: size,
                cook: cook,
                ingra: ingra,
                disease: disease,
                allergy: ""
            } 
        });
    };

    const getStarImage = (grade) => {
        switch (grade) {
            case 5:
                return "/images/curation/5star.png";
            case 4:
                return "/images/curation/4star.png";
            case 3:
                return "/images/curation/3star.png";
            case 2:
                return "/images/curation/2star.png";
            case 1:
                return "/images/curation/1star.png";
            default:
                return "/images/curation/default-star.png";
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const handleFilterClick = () => {
        setModalOpen(true);
    };

    const rangeChange = (event) => {
        setFilterPrice(parseInt(event.target.value));
    };
    
    const searchText = (e) => setValue(e.target.value);
    const toggleValue = (currentValue, value, setter) => {
        if (currentValue === value) {
            setter('');
        } else {
            setter(value);
        }
    };

    return(
        <div style={{width:"1180px", margin:"0 auto"}}>
            <div className={styles.box}>
                <div style={{position:"relative", display:"inline-block"}}>
                    <input type="text" className={styles.searchBox} placeholder="키워드를 입력해주세요" name='value' onChange={searchText} onKeyPress={onSubmitSearch}/>
                    <div className={styles.filterIcon} onClick={handleFilterClick} alt="Filter Icon" />
                    <div className={styles.searchIcon} onClick={handleSearchClick} alt="Search Icon" />
                </div>
                {
                    modalOpen &&
                    <div className={styles.modalContainer} ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false)
                        }
                    }}>
                        <div className={styles.modalContent}>
                            <div className={styles.allBox}>
                                <>
                                    <p className={styles.modalText}>크기</p>
                                    <hr className={styles.modalHr} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className={`${styles.modalButton} ${filterRecom === '소형견' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterRecom, '소형견', setFilterRecom)}
                                        >
                                            소형견
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterRecom === '중형견' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterRecom, '중형견', setFilterRecom)}
                                        >
                                            중형견
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterRecom === '대형견' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterRecom, '대형견', setFilterRecom)}
                                        >
                                            대형견
                                        </button>
                                    </div>
                                </>
                                <>
                                    <p className={styles.modalText}>나이</p>
                                    <hr className={styles.modalHr} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className={`${styles.modalButton} ${filterAge === '유아기' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterAge, '유아기', setFilterAge)}
                                        >
                                            유아기
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterAge === '청년기' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterAge, '청년기', setFilterAge)}
                                        >
                                            청년기
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterAge === '노년기' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterAge, '노년기', setFilterAge)}
                                        >
                                            노년기
                                        </button>
                                    </div>
                                </>
                                <>
                                    <p className={styles.modalText}>조리방식</p>
                                    <hr className={styles.modalHr} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className={`${styles.modalButton} ${filterCook === '건식' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterCook, '건식', setFilterCook)}
                                        >
                                            건식
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterCook === '습식' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterCook, '습식', setFilterCook)}
                                        >
                                            습식
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterCook === '화식' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterCook, '화식', setFilterCook)}
                                        >
                                            화식
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterCook === '소프트' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterCook, '소프트', setFilterCook)}
                                        >
                                            소프트
                                        </button>
                                    </div>
                                </>
                                <>
                                    <p className={styles.modalText}>입자크기</p>
                                    <hr className={styles.modalHr} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className={`${styles.modalButton} ${filterSize === 8 ? styles.modalButtonClick : ''}`}
                                            style={{ width: '80px' }}
                                            onClick={() => toggleValue(filterSize, 8, setFilterSize)}
                                        >
                                            8mm미만
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterSize === 10 ? styles.modalButtonClick : ''}`}
                                            style={{ width: '80px' }}
                                            onClick={() => toggleValue(filterSize, 10, setFilterSize)}
                                        >
                                            8~13mm
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterSize === 13 ? styles.modalButtonClick : ''}`}
                                            style={{ width: '80px' }}
                                            onClick={() => toggleValue(filterSize, 13, setFilterSize)}
                                        >
                                            13mm이상
                                        </button>
                                    </div>
                                </>
                                <>
                                    <p className={styles.modalText}>제품기능</p>
                                    <hr className={styles.modalHr} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '관절' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '관절', setFilterEffi)}
                                        >
                                            관절
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '면역' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '면역', setFilterEffi)}
                                        >
                                            면역
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '식욕증진' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '식욕증진', setFilterEffi)}
                                        >
                                            식욕증진
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '저알러지' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '저알러지', setFilterEffi)}
                                        >
                                            저알러지
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '영양공급' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '영양공급', setFilterEffi)}
                                        >
                                            영양공급
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '비타민' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '비타민', setFilterEffi)}
                                        >
                                            비타민
                                        </button>
                                        <button
                                            className={`${styles.modalButton} ${filterEffi === '다이어트' ? styles.modalButtonClick : ''}`}
                                            onClick={() => toggleValue(filterEffi, '다이어트', setFilterEffi)}
                                        >
                                            다이어트
                                        </button>
                                    </div>
                                </>
                                <>
                                    <p className={styles.modalText}>가격</p>
                                    <hr className={styles.modalHr}/>
                                    <div style={{display:"flex", gap:"10px", flexDirection:"column"}}>
                                        <div style={{display:"flex", justifyContent:"space-between", width:"330px"}}>
                                            <p style={{margin:"0"}}>0</p>
                                            <p style={{margin:"0"}}>{filterPrice}</p>
                                        </div>
                                        <input type="range" className={styles.range} min={0} max={maxPrice} step={1000} value={filterPrice} onChange={rangeChange}></input>
                                    </div>
                                </>
                                <div style={{display:"flex", gap:"50px", margin:"0 auto", marginTop:"20px"}}>
                                    <button className={styles.modalCancelButton} onClick={() => setModalOpen(false)}>취소</button>
                                    <button className={styles.modalCheckButton} onClick={() => setModalOpen(false)}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <select className={styles.selectBox}>
                    <option>정렬</option>
                    <option>이름</option>
                    <option>평점</option>
                </select>
            </div>
            <hr style={{width:"1180px", marginTop:"45px", border:"1px solid #D4D4D4"}}/>
            <div style={{display:"flex", marginTop:"50px", marginLeft:"100px"}}>
                <p style={{fontSize:"36px", fontWeight:"bold", margin:"0"}}>DogSeek</p>
                <p style={{fontSize:"36px", fontWeight:"bold", color:"#63C54A", marginLeft:"10px", margin:"0"}}>Most Recommend</p>
            </div>
            <div style={{width:"9555x", height:"420px"}}>
            {most
                .map(most => (
                    <div key={most.prodCode}>
                        <p>{most.prodCode}</p>
                    </div>
                ))}
            </div>
            <p style={{fontSize:"36px", fontWeight:"bold", margin:"0", marginLeft:"100px", marginTop:"50px"}}>ALL</p>
            <div className={styles.productsAllBox}>
            {product
                .map(product => (
                        <div key={product.prodCode} className={styles.productsBox} onClick={() => onClick(product.prodCode, product.prodRecom, product.prodSize, product.prodCook, product.prodIngra, product.prodEffi)}>
                                <img src={product.prodImage} style={{width:"100%"}}/>
                                <div className={styles.productHover}>
                                    <div style={{display:"flex", justifyContent:"center", marginTop:"70px"}}>
                                        <p style={{color:"white", fontWeight:"bold"}}>가격</p>
                                        <p style={{color:"white", marginLeft:"10px", fontWeight:"bold"}}>￦{formatPrice(product.prodPrice)}</p>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <p style={{color:"white", fontWeight:"bold"}}>제조사</p>
                                        <p style={{color:"white", marginLeft:"10px", fontWeight:"bold"}}>{product.prodManufac}</p>
                                    </div>
                                </div>
                            <div style={{display:"flex"}}>
                                <p style={{margin:"0", fontSize:"16px", fontWeight:"bold"}}>평점</p>
                                <img style={{width:"79px", height:"15px", marginTop:"5px", marginLeft:"10px"}} src={getStarImage(product.prodGrade)} alt={`${product.prodGrade} stars`}/>
                            </div>
                            <div style={{display:"flex"}}>
                                <p style={{margin:"0", fontSize:"16px", fontWeight:"bold", width:"55px"}}>제품명</p>
                                <p className={styles.prodText}>{product.prodName}</p>
                            </div>
                            <div style={{display:"flex"}}>
                                <p style={{margin:"0", fontSize:"16px", fontWeight:"bold", width:"78px"}}>제품기능</p>
                                <p className={styles.prodText}>{product.prodEffi}</p>
                            </div>
                        </div>
                ))
            }
            </div>
        </div>
    )
}

export default Products;