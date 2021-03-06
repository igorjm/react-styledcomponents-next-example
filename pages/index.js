import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';
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
            <Head>AluraQuiz -{db.title}</Head>
            <QuizContainer>
                <QuizLogo />
                <Widget
                    as={motion.section}
                    transition={{ delay: 0, duration: 0.5 }}
                    variants={{
                        show: { opacity: 1, y: '0' },
                        hidden: { opacity: 0, y: '100%' },
                    }}
                    initial="hidden"
                    animate="show"
                >
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

                <Widget
                    as={motion.section}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        show: { opacity: 1 },
                        hidden: { opacity: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                >
                    <Widget.Content>
                        <h1>Quizes da Galera</h1>
                        <ul>
                            {db.external.map(linkExterno => {
                                const [
                                    projectName,
                                    githubUser,
                                ] = linkExterno
                                    .replace(/\//g, '')
                                    .replace('https:', '')
                                    .replace('.vercel.app', '')
                                    .split('.');

                                return (
                                    <li key={linkExterno}>
                                        <Widget.Topic
                                            as={Link}
                                            href={`/quiz/${projectName}___${githubUser}`}
                                        >
                                            {`${githubUser}/${projectName}`}
                                        </Widget.Topic>
                                    </li>
                                );
                            })}
                        </ul>
                    </Widget.Content>
                </Widget>

                <Footer
                    as={motion.footer}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        show: { opacity: 1 },
                        hidden: { opacity: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                />
            </QuizContainer>

            <GitHubCorner projectUrl="https://github.com/igorjm" />
        </QuizBackground>
    );
}
