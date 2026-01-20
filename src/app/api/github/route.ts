import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache por 1 hora

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
    try {
        // Headers com autenticação (se token estiver disponível)
        const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio',
        };

        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        // Fetch user data
        const userResponse = await fetch("https://api.github.com/users/Otavio-Emanoel", {
            headers,
            next: { revalidate: 3600 }
        });

        if (!userResponse.ok) {
            console.error('User fetch failed:', userResponse.status, userResponse.statusText);
            throw new Error(`Failed to fetch user: ${userResponse.status}`);
        }

        const userData = await userResponse.json();

        // Fetch repos
        const reposResponse = await fetch(
            "https://api.github.com/users/Otavio-Emanoel/repos?type=owner&per_page=100&sort=updated&direction=desc",
            {
                headers,
                next: { revalidate: 3600 }
            }
        );

        if (!reposResponse.ok) {
            console.error('Repos fetch failed:', reposResponse.status, reposResponse.statusText);
            throw new Error(`Failed to fetch repos: ${reposResponse.status}`);
        }

        const reposData = await reposResponse.json();

        if (!Array.isArray(reposData)) {
            console.error('Repos data is not an array:', reposData);
            throw new Error('Repos data is not an array');
        }

        // Filtrar forks e pegar os top repos ordenados por updated
        const nonForkRepos = reposData
            .filter((repo: any) => !repo.fork)
            .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, 10);

        return NextResponse.json({
            user: userData,
            repos: nonForkRepos,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            }
        });
    } catch (error) {
        console.error('GitHub API Error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch GitHub data',
                message: error instanceof Error ? error.message : 'Unknown error',
                details: String(error)
            },
            { status: 500 }
        );
    }
}
