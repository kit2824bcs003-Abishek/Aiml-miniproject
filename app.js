import { modelMetrics, samplePredictions, preprocessingCode, advancedCode } from './content_data.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const highlightCode = (code) => {
        return code
            .replace(new RegExp('(import|from|def|if|not|in|return)', 'g'), '<span class="token-keyword">$1</span>')
            .replace(new RegExp('([a-zA-Z0-9_]+)\\(', 'g'), '<span class="token-function">$1</span>(')
            .replace(new RegExp('(\'.*?\'|".*?")', 'g'), '<span class="token-string">$1</span>')
            .replace(new RegExp('(#.*)', 'g'), '<span class="token-comment">$1</span>');
    };

    document.getElementById('code-preprocessing').innerHTML = highlightCode(preprocessingCode);
    document.getElementById('code-advanced').innerHTML = highlightCode(advancedCode);


    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    new Chart(document.getElementById('distributionChart'), {
        type: 'doughnut',
        data: {
            labels: ['Ham', 'Spam'],
            datasets: [{
                data: [50.1, 49.9],
                backgroundColor: ['#2563eb', '#e2e8f0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%'
        }
    });


    new Chart(document.getElementById('comparisonChart'), {
        type: 'bar',
        data: modelMetrics,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 90,
                    max: 100,
                    grid: { color: '#334155' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#f8fafc' }
                }
            }
        }
    });


    new Chart(document.getElementById('confusionMatrixChart'), {
        type: 'bubble',
        data: {
            datasets: [
                { label: 'True Ham', data: [{ x: 0, y: 0, r: 25 }], backgroundColor: '#2563eb' },
                { label: 'False Spam', data: [{ x: 1, y: 0, r: 5 }], backgroundColor: '#f87171' },
                { label: 'False Ham', data: [{ x: 0, y: 1, r: 8 }], backgroundColor: '#f87171' },
                { label: 'True Spam', data: [{ x: 1, y: 1, r: 22 }], backgroundColor: '#10b981' }
            ]
        },
        options: {
            scales: {
                x: { min: -0.5, max: 1.5, ticks: { callback: (v) => v === 0 ? 'Ham' : (v === 1 ? 'Spam' : '') } },
                y: { min: -0.5, max: 1.5, ticks: { callback: (v) => v === 0 ? 'Actual Ham' : (v === 1 ? 'Actual Spam' : '') } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.dataset.label
                    }
                }
            }
        }
    });


    const tableBody = document.getElementById('prediction-rows');
    samplePredictions.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-slate-100 hover:bg-slate-50 transition-colors";
        tr.innerHTML = `
            <td class="py-5 text-sm text-slate-600 italic">"${row.text}"</td>
            <td class="py-5 text-center"><span class="prediction-badge badge-ham">${row.true}</span></td>
            <td class="py-5 text-center"><span class="prediction-badge badge-${row.pred.toLowerCase()}">${row.pred}</span></td>
            <td class="py-5 text-right"><i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-500 inline"></i></td>
        `;
        tableBody.appendChild(tr);
    });
    lucide.createIcons();


    const menuBtn = document.getElementById('mobile-menu-btn');
    const aside = document.querySelector('aside');
    menuBtn.addEventListener('click', () => {
        aside.classList.toggle('hidden');
        aside.classList.toggle('flex');
    });
});
