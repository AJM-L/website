export default function Resume() {
    return (
        <div style={{ height: '90vh' }}>
            <iframe 
                src={require('../../assets/resume.pdf')} 
                width="100%" 
                height="100%" 
                title="Resume"
                style={{ border: 'none' }}
            />
        </div>
    )
}