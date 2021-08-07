import { useCallback, useEffect, useState } from 'react';
import {Container, Dropdown, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css'

function NavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [listContract, setListContract] = useState<string[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/list-contract.txt")
        .then((file) => file.text())
        .then((value) => {
            const listContractName = value.split("\n");
            listContractName.pop();
            console.log("\x1b[36m%s\x1b[0m", "listContractName", listContractName);
            setListContract(listContractName);
        });
    }, []);

    const renderListContract = useCallback(() => {
        return listContract.map((item) => {
        return (
            <li className="menuItem">
                <Link onClick={handleClose} to={`/${item.toLowerCase()}`}>{item} contract</Link>
            </li>
        );
        });
    }, [listContract]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={{fontWeight: 'bold'}}>Testing contract</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link onClick={handleShow} style={{color: '#3498db'}}>Contracts</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header style={{justifyContent: 'center'}}>
                    <Offcanvas.Title style={{color: 'rgb(52, 152, 219)'}}>Contracts</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="menuContent">
                        <nav>
                            {renderListContract()}
                        </nav>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default NavBar