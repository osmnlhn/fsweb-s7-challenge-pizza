import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Counter from "./Counter";
import axios from "axios";
import './Order.css'
import {
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardTitle,
  CardText,
  Button,
  FormFeedback,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const Order = (props) => {
  const [pizza, setPizza] = useState([
    {
      id: 1,
      name: "Kopernik",
      price: 89,
      currency: "TL",
      sugest:
        "Kopernik Pizza, İtalyan mutfağından dünya çapında tanınan, hamur tabanı üzerine mozarella peyniri, domates sosu ve çeşitli malzemelerin eklenmesiyle hazırlanan lezzetli bir yemektir. Sıcak servis edilir ve çeşitli restoranlarda veya fast food zincirlerinde bulamazsınız. ",
      img: "../assets/food-1.png",
    },
    {
      id: 2,
      name: "Techno",
      price: 99,
      currency: "TL",
      sugest:
        "Techno Pizza, hamur tabanı üzerine eklenen mozarella peyniri, domates sosu, sebzeler ve et ürünleri gibi çeşitli malzemelerle hazırlanan, dünya genelinde sevilen bir İtalyan yemeğidir. Pizza hamuru, ince ve çıtır bir kıvama sahiptir ve fırınlanarak hazırlanır. Dilimlenerek servis edilir ve yanında soslar, biberonlu şeker, kekik veya kırmızı biber gibi baharatlar sunulabilir.",
      img: "../assets/food-2.png",
    },
    {
      id: 3,
      name: "Travis",
      price: 109,
      currency: "TL",
      sugest:
        "Travis Pizza, hemen hemen herkesin sevdiği bir yemektir. Hamur tabanı, domates sosu, mozarella peyniri ve çeşitli malzemelerle hazırlanır. Malzemeler arasında salam, sosis, jambon, mantar, biber, soğan, mısır gibi sebzeler ve peynir çeşitleri yer alabilir. Pizza, sıcak servis edilir ve genellikle dilimlenerek servis edilir. Ayrıca, kişisel tercihlerine göre malzemeler değiştirilebilir veya pizza çeşitleri de farklılık gösterebilir.",
      img: "../assets/food-3.png",
    },
  ]);
  const [orderPizza, setOrderPizza] = useState({
    id: "",
    name: "",
    price: "",
    boyut: "",
    hamur: "",
    text: "",
    count: 1,
    secimler: "",
    totalPrice: 0,
    ekMalzemeler: "",
    sugest: "",
    currency: "",
    
  });
  const [formErrors, setFormErrors] = useState({
    id: "",
    name: "",
    price: "",
    boyut: "",
    hamur: "",
    text: "",
    count: "",
    secimler: "",
    totalPrice: "",
    ekMalzemeler: "",
    sugest: "",
  });

  const malzemeler = [
    "Peperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepone",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
  ];
  const [counter, setCounter] = useState(1);
  const [malzemeSayaci, setMalzemeSayaci] = useState(0);
  const [totalPrice, setTotalPrice] = useState(orderPizza.price);
  const lastPrice = totalPrice * counter;
  const [ekMalzemeler, setEkMalzemeler] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const perCost = 5;
  const navigate = useNavigate();
 
  const orderFormSchema = Yup.object().shape({
    boyut: Yup.string().required("Pizza boyutunu seçmek zorunlu"),
    hamur: Yup.string().required("Pizza hamurunu seçmek zorunlu"),
    ekMalzemeler: Yup.
      array().required().max(10,"En Fazla 10 seçim"),
    text: Yup.string().required("Sipariş notu girin"),
    name:Yup.string().required("Pizza seçimi yapmak zorunlu")
  });

  const selectPizza = (e) => {
    setOrderPizza({
      ...orderPizza,
      name: pizza[e.target.id - 1].name,
      price: pizza[e.target.id - 1].price,
      id: pizza[e.target.id - 1].id,
      sugest: pizza[e.target.id - 1].sugest,
      currency: pizza[e.target.id - 1].currency,
    });
    Yup.reach(orderFormSchema, pizza.name)
      .validate(e.target.value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] });
      });
    
  };
  
  
  const setCheck = (e) => {
    setOrderPizza({ ...orderPizza, [e.target.name]: e.target.checked });

    if (e.target.checked === true) {
      setEkMalzemeler([...ekMalzemeler, e.target.name]);
      setMalzemeSayaci(malzemeSayaci + 1);
      setTotalPrice(totalPrice + perCost);
    } else {
      setMalzemeSayaci(malzemeSayaci - 1);
      setTotalPrice(totalPrice - perCost);
      
      let deleteEkMalzemeler = ekMalzemeler.filter(item => item !== e.target.name);
      setEkMalzemeler(deleteEkMalzemeler);
    }
  };
  const changeHandler = (e) => {
    setOrderPizza({ ...orderPizza, [e.target.name]: e.target.value });   
    Yup.reach(orderFormSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        console.log(err.errors);
        setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] });
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.siparisss(orderPizza);
    axios
      .post("https://75e9o.mocklab.io/json/1", orderPizza)
      .then((response) => {
        navigate("/pizza");
      });
  };

  useEffect(() => {
    console.log("ekMalzemeler", ekMalzemeler);
  }, [ekMalzemeler]);
  


  useEffect(() => {
    console.log(">>>>>>>>>>>>>", orderPizza);
    orderFormSchema.isValid(orderPizza).then((valid) => setDisableButton(!valid)); 
  }, [orderPizza]);

  useEffect(() => {
    console.log("counter", counter);
    setOrderPizza({ ...orderPizza, count: counter });
  }, [counter]);

  useEffect(() => {
    setTotalPrice(orderPizza.price)
  }, [orderPizza.price]);

  useEffect(() => {
    setOrderPizza({
      ...orderPizza,
      totalPrice: totalPrice,
      secimler: malzemeSayaci * perCost,
      ekMalzemeler: ekMalzemeler,
    });
  }, [totalPrice]);

  return (
    <div>
      <div className="body"> 
        {pizza.map((e, index) => {
          return (
            <Card className="card-item"
              key={e.id}
              htmlFor={e.id}
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={require(`../assets/food-${e.id}.png`)} />
              <CardBody >
                <CardTitle tag="h5">
                  {e.name}
                </CardTitle>
                <CardSubtitle  tag="h6">
                  {e.price} TL
                </CardSubtitle>
                <CardText >{e.sugest}</CardText>

                <Button
                  className=""
                  id={e.id}
                  type="button"
                  name={e.name}
                  onClick={selectPizza}
                  
                >
                  SEÇ
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <div
        style={{
          width: "40%",
          margin: "2rem 30%",
        }}
      >
        <div>
          <h3 > {orderPizza.name} </h3>
          <div >{orderPizza.price} {orderPizza.currency} </div>
          <p >{orderPizza.sugest}</p>
        </div>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormGroup
              tag="fieldset"
              id="size-dropdown"
              invalid={formErrors.boyut}
              style={{ width: "50%" }}
            >
              <legend>Boyut Seç</legend>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  id="size-dropdown"
                  value="Küçük"
                  onChange={changeHandler}
                
                />{" "}
                <Label check htmlFor="size-dropdown">Küçük Boy</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  id="size-dropdown"
                  value="Orta"
                  onChange={changeHandler}
                  data-cy = "radio2"
                />{" "}
                <Label check htmlFor="size-dropdown">Orta Boy</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  id="size-dropdown"
                  value="Büyük"
                  onChange={changeHandler}
                  data-cy = "radio3"
                />{" "}
                <Label check htmlFor="size-dropdown">Büyük Boy</Label>
              </FormGroup>
              <FormFeedback >{formErrors.boyut}</FormFeedback>
            </FormGroup>
            </FormGroup>

            <FormGroup>
            <UncontrolledDropdown

              style={{ width: "50%" }}
            >
              <DropdownToggle caret color="light">
                <strong>Hamur Seç</strong>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header id="hamur-type">

                </DropdownItem>
                <DropdownItem
                  name="hamur"
                  value="İnce"
                  id="ince-hamur"
                  onClick={changeHandler}
                >
                  İnce Hamur
                </DropdownItem>
                <DropdownItem
                  name="hamur"
                  value="Orta"
                  id="orta-hamur"
                  onClick={changeHandler}
                >
                  Orta Hamur
                </DropdownItem>
                <DropdownItem
                  name="hamur"
                  value="Kalın"
                  id="kalin-hamur"
                  onClick={changeHandler}
                >
                  Kalın Hamur
                </DropdownItem>
              </DropdownMenu>
              <div>
              <p>
              <strong>Hamur:{orderPizza.hamur}</strong>
              </p>
              </div>
            </UncontrolledDropdown>
            </FormGroup>
            
          

          <FormGroup >
            <h4>Ek Malzemeler:</h4>
            <p>En az 4 malzeme seçiniz. <strong>5TL</strong> </p>
         
            <FormFeedback >{formErrors.ekMalzemeler}</FormFeedback>

            {malzemeler.map((e, index) => {
              return (
                <FormGroup check inline key={index}>
                  <Input
                    type="checkbox"
                    name={e}
                    key={index}
                    onChange={setCheck}
                    data-cy-checkbox={index}
                    
                  />
                  <Label check>{e}</Label>
                </FormGroup>
              );
            })}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="special-text">Sipariş Notu</Label>
            <Input
              id="special-text"
              name="text"
              type="textarea"
              placeholder="Siparişine eklemek istediğin not var mı?"
              onChange={changeHandler}
              invalid={formErrors.text}
            />
            <FormFeedback>{formErrors.text}</FormFeedback>
          </FormGroup>
<br/>
          <FormGroup >
            <Counter counter={setCounter} />

            <Card
              body
            
              style={{
                width: "5rem",
              }}
            >
              <CardTitle tag="h5">Sipariş Toplamı</CardTitle>
              <CardText>
                Seçimler: {malzemeSayaci * perCost} TL
                <br></br>
                <span>Toplam: {lastPrice} TL </span>
              </CardText>
              <Button id="order-button" type="submit" color="warning" disabled={disableButton}
             >
                SİPARİŞ VER
              </Button>
            </Card>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
export default Order;