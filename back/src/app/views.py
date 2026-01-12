from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view

@api_view(['POST'])
def cv_pdf(request):
    # 1) Receive data from Angular (JSON POST)
    data = request.data

    # 2) Build the Django template context
    context = {
        'personal': data.get('personal', {}),
        'profile': data.get('profile', ''),
        'skills': data.get('skills', []),
        'formations': data.get('formations', []),
        'experiences': data.get('experiences', []),
        'languages': data.get('languages', []),
        'interests': data.get('interest', []),
    }
    model = data.get('model', 'circulaire') + '.html'  
    # 3) Render the template with that context
    html_string = render_to_string(model, context, request=request)

    # 4) Convert rendered HTML to PDF using Chromium (Playwright)
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return HttpResponse(
            'Playwright is not installed. Run: pip install playwright && playwright install chromium',
            status=500,
        )

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            base_url = request.build_absolute_uri('/')
            page.goto(base_url, wait_until='domcontentloaded')
            page.set_content(html_string, wait_until='networkidle')
            force_two_columns_css = """
            @media print {
              div.min-h-screen.bg-gray-100 {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                min-height: auto !important;
              }

              div.min-h-screen.bg-gray-100 > aside {
                width: 33.333333% !important;
                flex: 0 0 33.333333% !important;
              }

              div.min-h-screen.bg-gray-100 > main {
                width: 66.666667% !important;
                flex: 0 0 66.666667% !important;
              }
            }
            """
            page.add_style_tag(content=force_two_columns_css)

            pdf = page.pdf(
                format='A4',
                margin={'top': '0mm', 'bottom': '0mm', 'left': '0mm', 'right': '0mm'},
                print_background=True,
                prefer_css_page_size=True,
            )
            browser.close()

        resp = HttpResponse(pdf, content_type='application/pdf')
        resp['Content-Disposition'] = 'attachment; filename="cv.pdf"'
        return resp
    except Exception as e:
        return HttpResponse(f'PDF generation failed: {str(e)}', status=500)