import styled from "styled-components";

export const TodoModal = styled.section`
    .container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        padding: 150px;
    }
    .card {
        background-color: #f4f4ed;
        padding: 30px;
        border-radius: 4%;
        box-shadow: 3px 3px 1px 0px #00000080;
        display: flex;
        flex-direction: column;
    }
    h1 {
        text-align: center;
        margin-bottom: 5px;
        color: #6ba9b6;
    }
    form div {
        text-align: center;
        background-color: #77c3d5;
        width: 50%;
        padding: 5px;
        margin: 5px;
        display: inline-block;
        border: 0;
        outline: none;
        width: 93%;
        font-size: 16px;
        transition: all 0.3s ease-out;
        border-radius: 20px;
    }

    .label-float {
        position: relative;
        padding-top: 1px;
        margin-top: 1%;
        margin-bottom: 5%;
        text-align: center;
    }
    .separar-h3 {
        display: flex;
        justify-content: space-between;
        background-color: #f4f4ed;
    }
    .label-float input,
    select,
    h3 {
        border: none;
        background-color: transparent;
        text-align: center;
        font-size: 18px;
        width: 100%;
        border-radius: 20px;
    }

    .label-float label,
    select {
        border: none;
        background-color: transparent;
        color: #758184;
    }

    input [type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .button-modalc,
    .buttons {
        bottom: 90px;
        border-color: #272262;
        color: #444449;
        padding: 8px;
        width: 100px;
        font-size: 16px;
        margin-top: 0;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.1s ease-out;
        background-color: #6ba9b6;
    }

    .button-modalc:hover,
    .buttons:hover {
        background-color: #1e5c74;
        font-weight: bolder;
    }
    .separar-botoes {
        display: flex;
        justify-content: space-around;
    }
    .separar-botoes button {
        //bottom: 90px;
        border-color: #272262;
        color: #444449;
        padding: 1px;
        width: 60px;
        font-size: 16px;
        margin-top: 0;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.1s ease-out;
        background-color: #6ba9b6;
    }
    .separar-botoes button:hover {
        background-color: #1e5c74;
        font-weight: bolder;
    }

    .alinhar {
        background-color: white;
        display: flex;
        justify-content: space-between;
    }
    .alinharVenda {
        display: flex;
        justify-content: end;
    }

    .infoVenda {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 94%;
    }
    .infoVenda h3 {
        text-align: start;
        background-color: #77c3d5;
        padding: 6px;
        margin: 10px;
        white-space: pre-wrap;
    }
    .data-contrato{
        color: #6B7877;
    }
    .produtos-container {
        max-height: 230px;
        overflow-y: auto;
    }
`;