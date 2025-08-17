class WebsiteGenerator {
    constructor() {
        this.templates = {
            website: this.createWebsiteTemplate,
            landing: this.createLandingTemplate,
            portfolio: this.createPortfolioTemplate,
            ecommerce: this.createEcommerceTemplate,
            blog: this.createBlogTemplate,
            app: this.createAppTemplate
        };
        
        this.colorSchemes = {
            blue: { primary: '#3498db', secondary: '#2980b9', accent: '#ecf0f1' },
            green: { primary: '#2ecc71', secondary: '#27ae60', accent: '#ecf0f1' },
            purple: { primary: '#9b59b6', secondary: '#8e44ad', accent: '#ecf0f1' },
            orange: { primary: '#e67e22', secondary: '#d35400', accent: '#ecf0f1' },
            dark: { primary: '#34495e', secondary: '#2c3e50', accent: '#ecf0f1' }
        };
        
        this.init();
    }
    
    init() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generateProject());
        document.getElementById('downloadHtml').addEventListener('click', () => this.downloadFile('html'));
        document.getElementById('downloadCss').addEventListener('click', () => this.downloadFile('css'));
        document.getElementById('downloadJs').addEventListener('click', () => this.downloadFile('js'));
        document.getElementById('downloadAll').addEventListener('click', () => this.downloadAll());
    }
    
    generateProject() {
        const config = this.getFormData();
        const generatedCode = this.generateCode(config);
        
        this.currentProject = generatedCode;
        this.showOutput();
        this.updatePreview(generatedCode.html);
    }
    
    getFormData() {
        const features = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);
            
        return {
            type: document.getElementById('projectType').value,
            name: document.getElementById('projectName').value || 'Meu Projeto',
            description: document.getElementById('projectDescription').value || 'Descrição do projeto',
            colorScheme: document.getElementById('colorScheme').value,
            features
        };
    }
    
    generateCode(config) {
        const template = this.templates[config.type];
        const colors = this.colorSchemes[config.colorScheme];
        
        return template.call(this, config, colors);
    }
    
    createWebsiteTemplate(config, colors) {
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">${config.name}</div>
            <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#services">Serviços</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home" class="hero">
            <h1>Bem-vindo ao ${config.name}</h1>
            <p>${config.description}</p>
            <button class="cta-btn">Saiba Mais</button>
        </section>
        
        <section id="about" class="about">
            <h2>Sobre Nós</h2>
            <p>Somos uma empresa dedicada a oferecer os melhores serviços.</p>
        </section>
        
        ${config.features.includes('gallery') ? this.createGallerySection() : ''}
        ${config.features.includes('testimonials') ? this.createTestimonialsSection() : ''}
        ${config.features.includes('contact') ? this.createContactSection() : ''}
    </main>
    
    <footer>
        <p>&copy; 2024 ${config.name}. Todos os direitos reservados.</p>
        ${config.features.includes('social') ? this.createSocialLinks() : ''}
    </footer>
    
    <script src="script.js"></script>
    ${config.features.includes('analytics') ? '<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>' : ''}
</body>
</html>`;
        
        const css = this.generateCSS(colors);
        const js = this.generateJS(config.features);
        
        return { html, css, js };
    }
    
    createLandingTemplate(config, colors) {
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Landing Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="landing-container">
        <header class="landing-header">
            <h1>${config.name}</h1>
            <p class="subtitle">${config.description}</p>
            <button class="cta-button">Começar Agora</button>
        </header>
        
        <section class="features">
            <h2>Por que escolher nosso produto?</h2>
            <div class="features-grid">
                <div class="feature">
                    <h3>🚀 Rápido</h3>
                    <p>Resultados em segundos</p>
                </div>
                <div class="feature">
                    <h3>💡 Inteligente</h3>
                    <p>Tecnologia avançada</p>
                </div>
                <div class="feature">
                    <h3>🔒 Seguro</h3>
                    <p>Seus dados protegidos</p>
                </div>
            </div>
        </section>
        
        ${config.features.includes('newsletter') ? this.createNewsletterSection() : ''}
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
        
        const css = this.generateLandingCSS(colors);
        const js = this.generateJS(config.features);
        
        return { html, css, js };
    }
    
    createPortfolioTemplate(config, colors) {
        // Template de portfólio
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Portfólio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="portfolio-nav">
        <div class="nav-brand">${config.name}</div>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#portfolio">Portfólio</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
        </ul>
    </nav>
    
    <section id="home" class="hero-portfolio">
        <h1>Olá, eu sou ${config.name}</h1>
        <p>${config.description}</p>
    </section>
    
    <section id="portfolio" class="portfolio-grid">
        <h2>Meus Trabalhos</h2>
        <div class="grid">
            <div class="portfolio-item">
                <img src="https://via.placeholder.com/300x200" alt="Projeto 1">
                <h3>Projeto 1</h3>
                <p>Descrição do projeto</p>
            </div>
            <div class="portfolio-item">
                <img src="https://via.placeholder.com/300x200" alt="Projeto 2">
                <h3>Projeto 2</h3>
                <p>Descrição do projeto</p>
            </div>
            <div class="portfolio-item">
                <img src="https://via.placeholder.com/300x200" alt="Projeto 3">
                <h3>Projeto 3</h3>
                <p>Descrição do projeto</p>
            </div>
        </div>
    </section>
    
    ${config.features.includes('contact') ? this.createContactSection() : ''}
    
    <script src="script.js"></script>
</body>
</html>`;
        
        const css = this.generatePortfolioCSS(colors);
        const js = this.generateJS(config.features);
        
        return { html, css, js };
    }
    
    createEcommerceTemplate(config, colors) {
        // Template de e-commerce básico
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Loja Online</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="ecommerce-header">
        <div class="header-top">
            <div class="logo">${config.name}</div>
            <div class="search-bar">
                <input type="text" placeholder="Buscar produtos...">
                <button>🔍</button>
            </div>
            <div class="cart">🛒 <span id="cart-count">0</span></div>
        </div>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Produtos</a></li>
                <li><a href="#categories">Categorias</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section class="hero-banner">
            <h1>Bem-vindo à ${config.name}</h1>
            <p>${config.description}</p>
            <button class="shop-now-btn">Comprar Agora</button>
        </section>
        
        <section id="products" class="products-section">
            <h2>Produtos em Destaque</h2>
            <div class="products-grid">
                <div class="product-card">
                    <img src="https://via.placeholder.com/250x200" alt="Produto 1">
                    <h3>Produto 1</h3>
                    <p class="price">R$ 99,90</p>
                    <button class="add-to-cart">Adicionar ao Carrinho</button>
                </div>
                <div class="product-card">
                    <img src="https://via.placeholder.com/250x200" alt="Produto 2">
                    <h3>Produto 2</h3>
                    <p class="price">R$ 149,90</p>
                    <button class="add-to-cart">Adicionar ao Carrinho</button>
                </div>
                <div class="product-card">
                    <img src="https://via.placeholder.com/250x200" alt="Produto 3">
                    <h3>Produto 3</h3>
                    <p class="price">R$ 79,90</p>
                    <button class="add-to-cart">Adicionar ao Carrinho</button>
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 ${config.name}. Todos os direitos reservados.</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;
        
        const css = this.generateEcommerceCSS(colors);
        const js = this.generateEcommerceJS();
        
        return { html, css, js };
    }
    
    createBlogTemplate(config, colors) {
        // Template de blog
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Blog</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="blog-header">
        <div class="header-content">
            <h1>${config.name}</h1>
            <p>${config.description}</p>
        </div>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#posts">Posts</a></li>
                <li><a href="#categories">Categorias</a></li>
                <li><a href="#about">Sobre</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="blog-main">
        <section class="featured-post">
            <h2>Post em Destaque</h2>
            <article class="post-card featured">
                <img src="https://via.placeholder.com/600x300" alt="Post em destaque">
                <div class="post-content">
                    <h3>Como criar um site incrível em 2024</h3>
                    <p class="post-meta">Por Admin • 15 de Janeiro, 2024</p>
                    <p>Descubra as melhores práticas para criar sites modernos e responsivos...</p>
                    <a href="#" class="read-more">Ler mais</a>
                </div>
            </article>
        </section>
        
        <section class="recent-posts">
            <h2>Posts Recentes</h2>
            <div class="posts-grid">
                <article class="post-card">
                    <img src="https://via.placeholder.com/300x200" alt="Post 1">
                    <div class="post-content">
                        <h3>Tendências de Design Web</h3>
                        <p class="post-meta">10 de Janeiro, 2024</p>
                        <p>As principais tendências que vão dominar o design web...</p>
                        <a href="#" class="read-more">Ler mais</a>
                    </div>
                </article>
                <article class="post-card">
                    <img src="https://via.placeholder.com/300x200" alt="Post 2">
                    <div class="post-content">
                        <h3>JavaScript Moderno</h3>
                        <p class="post-meta">5 de Janeiro, 2024</p>
                        <p>Aprenda as funcionalidades mais recentes do JavaScript...</p>
                        <a href="#" class="read-more">Ler mais</a>
                    </div>
                </article>
            </div>
        </section>
    </main>
    
    <aside class="sidebar">
        <div class="widget">
            <h3>Categorias</h3>
            <ul>
                <li><a href="#">Web Design (5)</a></li>
                <li><a href="#">JavaScript (3)</a></li>
                <li><a href="#">CSS (4)</a></li>
                <li><a href="#">HTML (2)</a></li>
            </ul>
        </div>
        
        ${config.features.includes('newsletter') ? this.createNewsletterWidget() : ''}
    </aside>
    
    <footer>
        <p>&copy; 2024 ${config.name}. Todos os direitos reservados.</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;
        
        const css = this.generateBlogCSS(colors);
        const js = this.generateJS(config.features);
        
        return { html, css, js };
    }
    
    createAppTemplate(config, colors) {
        // Template de aplicativo web
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name} - Web App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="app-logo">${config.name}</div>
            <div class="app-user">
                <span>Usuário</span>
                <button class="user-menu">⚙️</button>
            </div>
        </header>
        
        <nav class="app-sidebar">
            <ul>
                <li><a href="#dashboard" class="nav-item active">📊 Dashboard</a></li>
                <li><a href="#projects" class="nav-item">📁 Projetos</a></li>
                <li><a href="#tasks" class="nav-item">✅ Tarefas</a></li>
                <li><a href="#analytics" class="nav-item">📈 Analytics</a></li>
                <li><a href="#settings" class="nav-item">⚙️ Configurações</a></li>
            </ul>
        </nav>
        
        <main class="app-main">
            <div id="dashboard" class="app-view active">
                <h1>Dashboard</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total de Projetos</h3>
                        <p class="stat-number">12</p>
                    </div>
                    <div class="stat-card">
                        <h3>Tarefas Concluídas</h3>
                        <p class="stat-number">48</p>
                    </div>
                    <div class="stat-card">
                        <h3>Usuários Ativos</h3>
                        <p class="stat-number">156</p>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h2>Atividade Recente</h2>
                    <div class="chart-placeholder">
                        <p>Gráfico de atividades aqui</p>
                    </div>
                </div>
            </div>
            
            <div id="projects" class="app-view">
                <h1>Projetos</h1>
                <button class="add-btn">+ Novo Projeto</button>
                <div class="projects-list">
                    <div class="project-item">
                        <h3>Projeto Website</h3>
                        <p>Status: Em andamento</p>
                        <div class="project-progress">
                            <div class="progress-bar" style="width: 75%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="tasks" class="app-view">
                <h1>Tarefas</h1>
                <div class="task-list">
                    <div class="task-item">
                        <input type="checkbox" id="task1">
                        <label for="task1">Finalizar design da homepage</label>
                    </div>
                    <div class="task-item">
                        <input type="checkbox" id="task2">
                        <label for="task2">Implementar sistema de login</label>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
        
        const css = this.generateAppCSS(colors);
        const js = this.generateAppJS();
        
        return { html, css, js };
    }
    
    // Métodos auxiliares para seções específicas
    createGallerySection() {
        return `
        <section id="gallery" class="gallery">
            <h2>Galeria</h2>
            <div class="gallery-grid">
                <img src="https://via.placeholder.com/300x200" alt="Imagem 1">
                <img src="https://via.placeholder.com/300x200" alt="Imagem 2">
                <img src="https://via.placeholder.com/300x200" alt="Imagem 3">
                <img src="https://via.placeholder.com/300x200" alt="Imagem 4">
            </div>
        </section>`;
    }
    
    createTestimonialsSection() {
        return `
        <section id="testimonials" class="testimonials">
            <h2>Depoimentos</h2>
            <div class="testimonials-grid">
                <div class="testimonial">
                    <p>"Excelente serviço! Recomendo a todos."</p>
                    <cite>- João Silva</cite>
                </div>
                <div class="testimonial">
                    <p>"Profissionais competentes e atenciosos."</p>
                    <cite>- Maria Santos</cite>
                </div>
            </div>
        </section>`;
    }
    
    createContactSection() {
        return `
        <section id="contact" class="contact">
            <h2>Entre em Contato</h2>
            <form class="contact-form">
                <input type="text" placeholder="Seu nome" required>
                <input type="email" placeholder="Seu email" required>
                <textarea placeholder="Sua mensagem" required></textarea>
                <button type="submit">Enviar Mensagem</button>
            </form>
        </section>`;
    }
    
    createSocialLinks() {
        return `
        <div class="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
        </div>`;
    }
    
    createNewsletterSection() {
        return `
        <section class="newsletter">
            <h2>Receba nossas novidades</h2>
            <form class="newsletter-form">
                <input type="email" placeholder="Seu melhor email">
                <button type="submit">Inscrever-se</button>
            </form>
        </section>`;
    }
    
    createNewsletterWidget() {
        return `
        <div class="widget">
            <h3>Newsletter</h3>
            <p>Receba as últimas novidades!</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Seu email">
                <button type="submit">Inscrever</button>
            </form>
        </div>`;
    }
    
    // Geradores de CSS específicos
    generateCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: ${colors.primary};
    color: white;
    padding: 1rem 0;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

nav a:hover {
    opacity: 0.8;
}

.hero {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    color: white;
    text-align: center;
    padding: 4rem 2rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.cta-btn {
    background: ${colors.secondary};
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 2rem;
    transition: background 0.3s;
}

.cta-btn:hover {
    background: ${colors.primary};
}

section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}

.gallery-grid img {
    width: 100%;
    border-radius: 8px;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.testimonial {
    background: ${colors.accent};
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
}

.contact-form {
    max-width: 600px;
    margin: 2rem auto 0;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.contact-form button {
    background: ${colors.primary};
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
}

.social-links {
    margin-top: 1rem;
}

.social-links a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    nav ul {
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    section {
        padding: 2rem 1rem;
    }
}`;
    }
    
    generateLandingCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    min-height: 100vh;
    color: white;
}

.landing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.landing-header {
    text-align: center;
    padding: 4rem 0;
}

.landing-header h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.cta-button {
    background: white;
    color: ${colors.primary};
    padding: 1.5rem 3rem;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-3px);
}

.features {
    padding: 4rem 0;
    text-align: center;
}

.features h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.feature h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.newsletter {
    background: rgba(255,255,255,0.1);
    padding: 3rem;
    border-radius: 15px;
    text-align: center;
    margin-top: 3rem;
}

.newsletter-form {
    display: flex;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto 0;
}

.newsletter-form input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 25px;
}

.newsletter-form button {
    background: ${colors.secondary};
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .landing-header h1 {
        font-size: 2.5rem;
    }
    
    .newsletter-form {
        flex-direction: column;
    }
}`;
    }
    
    generatePortfolioCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.portfolio-nav {
    background: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.primary};
}

.portfolio-nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.portfolio-nav a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
}

.portfolio-nav a:hover {
    color: ${colors.primary};
}

.hero-portfolio {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    color: white;
    text-align: center;
    padding: 8rem 2rem 4rem;
    margin-top: 60px;
}

.hero-portfolio h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
}

.portfolio-grid {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.portfolio-grid h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: ${colors.primary};
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.portfolio-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.portfolio-item:hover {
    transform: translateY(-5px);
}

.portfolio-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.portfolio-item h3 {
    padding: 1rem;
    color: ${colors.primary};
}

.portfolio-item p {
    padding: 0 1rem 1rem;
    color: #666;
}

@media (max-width: 768px) {
    .portfolio-nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero-portfolio {
        padding-top: 6rem;
    }
    
    .hero-portfolio h1 {
        font-size: 2.5rem;
    }
}`;
    }
    
    generateEcommerceCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.ecommerce-header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${colors.primary};
}

.search-bar {
    display: flex;
    flex: 1;
    max-width: 400px;
    margin: 0 2rem;
}

.search-bar input {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 25px 0 0 25px;
    border-right: none;
}

.search-bar button {
    padding: 0.8rem 1rem;
    background: ${colors.primary};
    color: white;
    border: 2px solid ${colors.primary};
    border-radius: 0 25px 25px 0;
    cursor: pointer;
}

.cart {
    background: ${colors.primary};
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
}

nav {
    background: ${colors.primary};
    padding: 1rem 0;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
}

nav a:hover {
    opacity: 0.8;
}

.hero-banner {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    color: white;
    text-align: center;
    padding: 4rem 2rem;
}

.hero-banner h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.shop-now-btn {
    background: white;
    color: ${colors.primary};
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 2rem;
    transition: transform 0.3s;
}

.shop-now-btn:hover {
    transform: translateY(-2px);
}

.products-section {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.products-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: ${colors.primary};
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.product-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-card h3 {
    padding: 1rem 1rem 0.5rem;
    color: #333;
}

.price {
    padding: 0 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${colors.primary};
}

.add-to-cart {
    width: 100%;
    padding: 1rem;
    background: ${colors.primary};
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
}

.add-to-cart:hover {
    background: ${colors.secondary};
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}

@media (max-width: 768px) {
    .header-top {
        flex-direction: column;
        gap: 1rem;
    }
    
    .search-bar {
        margin: 0;
        max-width: 100%;
    }
    
    nav ul {
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .hero-banner h1 {
        font-size: 2rem;
    }
}`;
    }
    
    generateBlogCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
}

.blog-header {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    color: white;
    text-align: center;
    padding: 3rem 2rem 2rem;
}

.blog-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

nav {
    background: rgba(255,255,255,0.1);
    padding: 1rem 0;
    margin-top: 2rem;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background 0.3s;
}

nav a:hover {
    background: rgba(255,255,255,0.2);
}

.blog-main {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.featured-post {
    margin-bottom: 4rem;
}

.featured-post h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${colors.primary};
}

.post-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

.post-card.featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
}

.post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-card.featured img {
    height: 100%;
}

.post-content {
    padding: 2rem;
}

.post-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${colors.primary};
}

.post-meta {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.read-more {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: bold;
}

.read-more:hover {
    text-decoration: underline;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.sidebar {
    max-width: 300px;
    margin: 3rem auto;
    padding: 0 2rem;
}

.widget {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

.widget h3 {
    color: ${colors.primary};
    margin-bottom: 1rem;
}

.widget ul {
    list-style: none;
}

.widget li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.widget a {
    color: #333;
    text-decoration: none;
}

.widget a:hover {
    color: ${colors.primary};
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.newsletter-form input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.newsletter-form button {
    padding: 0.8rem;
    background: ${colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem;
}

@media (max-width: 768px) {
    .blog-header h1 {
        font-size: 2rem;
    }
    
    .post-card.featured {
        grid-template-columns: 1fr;
    }
    
    nav ul {
        flex-wrap: wrap;
        gap: 1rem;
    }
}`;
    }
    
    generateAppCSS(colors) {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: #f5f5f5;
    color: #333;
}

.app-container {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar main";
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr;
    height: 100vh;
}

.app-header {
    grid-area: header;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
}

.app-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.primary};
}

.app-user {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-menu {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 5px;
    transition: background 0.3s;
}

.user-menu:hover {
    background: #f0f0f0;
}

.app-sidebar {
    grid-area: sidebar;
    background: white;
    border-right: 1px solid #e0e0e0;
    padding: 2rem 0;
}

.app-sidebar ul {
    list-style: none;
}

.nav-item {
    display: block;
    padding: 1rem 2rem;
    color: #666;
    text-decoration: none;
    transition: all 0.3s;
    border-left: 3px solid transparent;
}

.nav-item:hover,
.nav-item.active {
    background: #f8f9fa;
    color: ${colors.primary};
    border-left-color: ${colors.primary};
}

.app-main {
    grid-area: main;
    padding: 2rem;
    overflow-y: auto;
}

.app-view {
    display: none;
}

.app-view.active {
    display: block;
}

.app-view h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${colors.primary};
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
}

.stat-card h3 {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${colors.primary};
}

.chart-container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10