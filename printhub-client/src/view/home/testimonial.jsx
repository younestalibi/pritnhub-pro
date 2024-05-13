
import { Col,Row, Carousel} from "antd";
import image1 from "../../assets/images/avatar.png";

const items = [
    {
        key: '1',
        name: 'Jory tribiani',
        image: image1,
        position: 'CEO, Company ABC',
        descritpion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget risus non massa laoreet pharetra.'
    },
    {
        key: '2',
        name: 'Rachel green',
        image: image1,
        position: 'CEO, Company ABC',
        descritpion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget risus non massa laoreet pharetra.'
    },
    {
        key: '3',
        name: 'Monica Geller',
        image: image1,
        position: 'CEO, Company ABC',
        descritpion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget risus non massa laoreet pharetra. '
    },

];
export default function AppTestimonial(){
        return (
            <div className="block aboutBlock  bgGray">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h1>What Are They Saying About Us</h1>
                </div>
                <Carousel autoplay>
                    { items.map(item =>{
                        return (
                            <Row key={item.key} style={{justifyContent:'center'}}>                   
                                <Col span={24} >
                                    <div   className="testimonial-section">
                                        <div className="testimonial-card">
                                            <div className="test">
                                            <div className="avatar-container">
                                              <img className="avatar" src={item.image} alt="Avatar" />
                                            </div>
                                            <div className="info-container">
                                            <p className="testimonial-author">{item.name}</p>
                                            <p className="testimonial-position">{item.position}</p>
                                            </div>
                                            </div>
                                            <i className="fa-solid fa-quote-left"></i>
                                            <p className="testimonial-text">
                                                {item.descritpion}
                                             </p>
                                             <i className="fa-solid fa-quote-right" style={{margin: '0 0 0 500px'}}></i>
                                        </div>
                                    </div> 
                                </Col>
                            </Row>
                        );
                    })}
                </Carousel>
            </div>
            </div>
        );

}




