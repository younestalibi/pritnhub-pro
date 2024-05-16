import { Card , Carousel, Col,Row} from "antd";
import { Link } from "react-router-dom";
import image1 from "../../../assets/images/t-shirt.avif";

const {Meta} = Card


const items = [
    {
        key: "business-cards",
        title: 'Business Cards',
        image: image1
    },
    {
        key: "flyers-brochures",
        title: 'Flyers & Brochures',
        image: image1

    },
    {
        key: "banners-signs",
        title: 'Banners Signs',
        image: image1
      
    },

];

export default function AppCategory(){
    const chunkSize = 3; 

    
    const chunkedItems = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        chunkedItems.push(items.slice(i, i + chunkSize));
    }
        return (
            <div className="block bgGray">
            <div className="container-fluid">
            <div className="titleHolder">
                <h1>Our categries</h1>
            </div>
            <Carousel autoplay style={{marginLeft:'100px'}}  >
                    {chunkedItems.map((chunk, index) => (
                        <div key={index} >
                            <Row gutter={[16, 16]} >
                                {chunk.map(item => (
                                    <Col span={8} key={item.key} >
                                         <Link to={`category/${item.key}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={<img alt="example" src={item.image} />}
                                            >
                                                <Meta title={item.title} />    
                                            </Card>
                                        </Link>                                
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Carousel>
        </div>
        </div>
        );
}


