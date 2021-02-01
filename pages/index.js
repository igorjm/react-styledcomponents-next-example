import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
    const router = useRouter();
    const [name, setName] = React.useState('');

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
                            <Input
                                type="text"
                                name="nomeDoUsuario"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Seu nome..."
                            />

                            <Button type="submit" disabled={!name}>
                                {`Jogar como: ${name}`}
                            </Button>
                        </form>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/igorjm" />
        </QuizBackground>
    );
}
