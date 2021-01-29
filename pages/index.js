import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

import db from "../db.json";

import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";

export const QuizContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    @media screen and (max-width: 500px) {
        margin: auto;
        padding: 15px;
    }
`;

export default function Home() {
    const router = useRouter();
    const [name, setName] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/quiz?name=${name}`);
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>Quiz</title>
            </Head>
            <QuizContainer>
                <QuizLogo />
                <Widget>
                    <Widget.Header>
                        <h1>{db.title}</h1>
                    </Widget.Header>
                    <Widget.Content>
                        {/* <p>{db.description}</p> */}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome.."
                            />

                            <button type="submit" disabled={!name}>
                                Jogar {name}
                            </button>
                        </form>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/igorjm" />
        </QuizBackground>
    );
}
